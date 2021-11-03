const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

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
        res.render('recipeList', { title: 'Rezepte', recipeList: recipes });
    });
};

exports.recipeDetail = function (req, res, next) {
    console.log(req.params);
    Recipe.findOne({ _id: req.params.recipeID }, function (err, recipe) {
        if (err) console.log(err);
        res.render('recipeDetail', { title: 'Rezepte', recipeData: recipe });
    });
};

exports.testInsert = function (req, res, next) {
    var exampleRecipe = new Recipe({
        title: 'Griechischer Bauernsalat',
        category: 'Vorspeise',
        imgUrl: 'https://img.chefkoch-cdn.de/rezepte/262751102375096/bilder/967331/crop-600x400/griechischer-bauernsalat.jpg',
        instructions:
            'Gurke waschen und ungeschält in dünne Scheiben oder Stücke schneiden. Paprika waschen, entkernen und in dünne Streifen schneiden. Tomaten waschen und achteln. Zwiebeln schälen und in feine Ringe schneiden. Schafskäse würfeln und mit Oregano bestreuen. Oliven abgießen und mit Gurke, Paprika, Tomaten, Zwiebeln und Schafskäse in eine Schüssel geben. Olivenöl, Zitronensaft, Salz und Pfeffer zu einer Sauce verrühren und über den Salat gießen. Umrühren.',
        ingredients: [
            'Salatgurke',
            'Paprikaschote',
            'Tomate',
            'Zwiebel',
            'Schafskäse',
            'Oliven',
            'Olivenöl',
        ],
        amounts: ['1', '2', '500 g', '2', '200 g', '1 Glas', '125 ml'],
    });

    exampleRecipe.save(function (error) {
        if (error) console.log(error);
        res.send('Erfolgreich erstellt');
    });
};
