var express = require('express');
var router = express.Router();

const recipeController = require('../controllers/recipeController');

/* GET home page. */
router.get('/', recipeController.recipeList_get);

router.get('/erstellen', recipeController.recipeCreate_get);

router.post('/erstellen', recipeController.recipeCreate_post);

router.get('/:recipeID', recipeController.recipeDetail_get);

module.exports = router;
