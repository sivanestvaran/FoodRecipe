const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    categories: {
        type: String,
        required: [true, "Category is required"]
    },
    ingredients: {
        type: Array,
        required: [true, "Ingredients is required"]
    },
    direction: {
        type: Array,
        required: [true, "Direction is required"]
    },
    time: {
        type: String
    },
    servings: {
        type: String
    },
    coverImage: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe