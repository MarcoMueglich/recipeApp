var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

let connectionString =
    'mongodb+srv://dbUser:s2auDokBPzzgLdgP@recipedb.6ejbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const exampleRecipe = new Recipe({
    title: 'Salat',
    category: 'Appetizer',
    photoUrl: 'https://images.lecker.de/,id=4dba2952,b=lecker,w=610,cg=c.jpg',
});

// TODO not Working yet, "MongooseError: Operation `recipes.insertOne()` buffering timed out after 10000ms"
exampleRecipe.save(function (error, document) {
    if (error) console.error(error);
    console.log(document);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('recipes', { title: 'Rezepte', recipeData: recipes });
});

module.exports = router;
