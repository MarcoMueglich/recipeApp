const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const { body, validationResult } = require('express-validator');

let connectionString =
    'mongodb+srv://dbUser:WT5vOXTSepRvIFdE@recipedb.6ejbk.mongodb.net/recipeDB?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.recipeList_get = function (req, res, next) {
    Recipe.find({})
        .sort({ category: 'desc', title: 'asc' })
        .exec(function (err, recipes) {
            if (err) console.log(err);
            res.render('recipeList', { title: 'Rezepte', recipeList: recipes });
        });
};

exports.recipeDetail_get = function (req, res, next) {
    Recipe.findById(req.params.recipeID, function (err, recipe) {
        if (err) console.log(err);

        if (recipe != null) {
            res.render('recipeDetail', {
                title: recipe.title,
                recipeData: recipe,
            });
        } else {
            res.status('404').send('Recipe not found');
        }
    });
};

exports.recipeDetail_getJSON = function (req, res, next) {
    Recipe.findById(req.params.recipeID, function (err, recipe) {
        if (err) console.log(err);

        if (recipe != null) {
            res.json(recipe);
        } else {
            res.status('404').send('Recipe not found');
        }
    });
};

exports.recipeCreate_get = function (req, res, next) {
    res.render('recipeCreate', { title: 'Rezepte' });
};

// TODO Check for JPG/PNG and if URL is reachable

exports.recipeCreate_post = [
    body('title', 'Titel ist leer!').trim().isLength({ min: 1 }).escape(),
    body('category', 'Kategorie ist leer!')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('imgUrl', 'Foto ist leer!').isLength({ min: 1 }),
    body('instructions', 'Zubereitung ist leer!')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('ingredients.*').escape(),
    body('amounts.*').escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        var newRecipe = req.body;
        var recipe = new Recipe({
            title: newRecipe.title,
            category: newRecipe.category,
            imgUrl: newRecipe.imgUrl,
            instructions: newRecipe.instructions,
            ingredients: newRecipe.ingredients,
            amounts: newRecipe.amounts,
        });

        if (errors.isEmpty()) {
            recipe.save(function (error) {
                if (error) console.log(error);
                res.json(recipe);
            });
        } else {
            res.json(errors);
        }
    },
];

exports.recipeEdit_get = function (req, res, next) {
    Recipe.findById(req.params.recipeID, function (err, recipe) {
        if (err) console.log(err);

        if (recipe != null) {
            res.render('recipeEdit', {
                title: 'Edit - ' + recipe.title,
                recipeData: recipe,
            });
        } else {
            res.status('404').send('Recipe not found');
        }
    });
};

// TODO Check for JPG/PNG and if URL is reachable
exports.recipeEdit_put = [
    body('title', 'Titel ist leer!').trim().isLength({ min: 1 }).escape(),
    body('category', 'Kategorie ist leer!')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('imgUrl', 'Foto ist leer!').isLength({ min: 1 }),
    body('instructions', 'Zubereitung ist leer!')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('ingredients.*').escape(),
    body('amounts.*').escape(),
    (req, res, next) => {
        var newRecipe = req.body;
        if (newRecipe.title && newRecipe.title != '') {
            Recipe.findByIdAndUpdate(req.params.recipeID, req.body, (err) => {
                if (err) console.log(err);
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify('Successful'));
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify('Error'));
        }
    },
];

exports.recipeDelete = function (req, res, next) {
    Recipe.findByIdAndRemove(req.params.recipeID, (err) => {
        if (err) console.log(err);
        res.redirect('/rezepte');
    });
};
