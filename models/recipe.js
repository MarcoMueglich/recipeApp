const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    category: String,
    imgUrl: String,
    instructions: String,
    ingredients: [String],
    amounts: [String],
});

recipeSchema.virtual('url').get(function () {
    return '/rezepte/' + this._id;
});

module.exports = mongoose.model('Recipe', recipeSchema);
