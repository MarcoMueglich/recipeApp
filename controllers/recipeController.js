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

exports.recipeList_get = function (req, res, next) {
  Recipe.find({}, function (err, recipes) {
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

exports.recipeCreate_get = function (req, res, next) {
  res.render('recipeCreate', { title: 'Rezepte' });
};

// TODO Add Validation/Sanitization before saving to DB

exports.recipeCreate_post = function (req, res, next) {
  var newRecipe = req.body;
  var recipe = new Recipe({
    title: newRecipe.title,
    category: newRecipe.category,
    imgUrl: newRecipe.imgUrl,
    instructions: newRecipe.instructions,
    ingredients: newRecipe.ingredients,
    amounts: newRecipe.amounts,
  });

  // TODO Rework result JSON as Object
  if (newRecipe.title && newRecipe.title != '') {
    recipe.save(function (error) {
      if (error) console.log(error);
      console.log(
        `INFO: ${new Date().toLocaleString('en-US')} : Recipe saved succesfully`
      );
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify('Successful'));
    });
  } else {
    console.log(
      `WARN: ${new Date().toLocaleString('en-US')} : Error on saving Recipe`
    );

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify('Error'));
  }
};

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

// TODO implement recipeEdit_put to edit recipes in DB

exports.recipeEdit_put = function (req, res, next) {
  res.render('recipeCreate', { title: 'Rezepte' });
};

exports.recipeDelete = function (req, res, next) {
  Recipe.findByIdAndRemove(req.params.recipeID, (err) => {
    if (err) console.log(err);
    res.redirect('/rezepte');
  });
};
