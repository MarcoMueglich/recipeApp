const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    category: String,
    photoUrl: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
