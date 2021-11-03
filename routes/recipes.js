var express = require('express');
var router = express.Router();

const recipeController = require('../controllers/recipeController');

/* GET home page. */
router.get('/', recipeController.recipeList);

router.get('/testInsert', recipeController.testInsert);

router.get('/:recipeID', recipeController.recipeDetail);

module.exports = router;
