const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

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

exports.recipeList = function (req, res, next) {
    Recipe.find({}, function (err, recipes) {
        if (err) console.log(err);
        res.render('recipes', { title: 'Rezepte', recipeData: recipes });
    });
};

exports.recipeDetail = function (req, res, next) {
    console.log(req.params);
    Recipe.find({}, function (err, recipes) {
        if (err) console.log(err);
        res.render('recipes', { title: 'Rezepte', recipeData: recipes });
    });
};

exports.testInsert = function (req, res, next) {
    var exampleRecipe = new Recipe({
        title: 'Salat',
        category: 'Appetizer',
        photoUrl:
            'https://images.lecker.de/,id=4dba2952,b=lecker,w=610,cg=c.jpg',
    });

    exampleRecipe.save(function (error) {
        if (error) console.log(error);
    });
    res.render('recipes', { title: 'Rezepte' });
};
