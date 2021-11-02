var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const recipeController = require('../controllers/recipeController');

/* GET home page. */
router.get('/', recipeController.recipeList);

router.get('/:recipeID', recipeController.recipeDetail);

router.get('/testInsert', recipeController.testInsert);

module.exports = router;
