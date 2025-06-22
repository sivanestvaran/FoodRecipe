const Recipe = require('../models/recipe')
const helper = require('../utils/helper')
const addRecipe = async (req, res) => {

    const { title, servings, categories, time, ingredients, direction } = req.body
    const { filename } = req.file
    const user = req.user

    try {

        //res.status(201).json({ status: 'success', inputs: ingredients })


        // parsedIngredients.forEach((item) => console.log(item))
        // console.log(ingredients)

        //Validate all required fields
        const validation = helper.validationInputs({ title, servings, categories, time })
        if (validation.length !== 0) { return res.status(400).json({ status: 'fail', message: validation }); }

        if (ingredients.length == 0 || direction.length == 0) {
            return res.status(400).json({ status: 'fail', message: 'Ingredients and Direction cannot be empty' });
        }


        const newRecipe = await Recipe.create({ title, servings, categories, time, ingredients, direction, coverImage: filename, createdBy: user.id })

        res.status(201).json({ status: 'success', newRecipe })

    } catch (error) {
        res.json({ messsage: error.message })
    }

    // res.json({messsage:'Page Load Succes2fully',body : req.body,image:req.file})
}

const getRecipesByUser = async (req, res) => {
    const user = req.user

    const allrecipes = await Recipe.find({ createdBy: user.id })

    return res.status(200).json({ allrecipes })
}

const getRecipes = async (req, res) => {

    const allrecipes = await Recipe.find()

    return res.status(200).json({ allrecipes })
}

const getRecipeById = async (req, res) => {

    try {

        const { id } = req.params

        const recipe = await Recipe.findOne({ _id: id })

        return res.status(200).json({ status: 'success', recipe })

    } catch (error) {
        return res.status(404).json({ status: 'fail' })
    }

}


const updateRecipe = async (req, res) => {

    const { title, servings, categories, time, ingredients, direction } = req.body
    const filename = req?.file?.filename
    const user = req.user

    const { id } = req.params

    try {

        //res.status(201).json({ status: 'success', inputs: ingredients })


        // parsedIngredients.forEach((item) => console.log(item))
        // console.log(ingredients)

        const updateData = {
            title,
            servings,
            categories,
            time,
            ingredients,
            direction,
            createdBy: user.id
        };


        if (filename) {
            updateData.coverImage = filename;
        }


        //Validate all required fields
        const validation = helper.validationInputs({ title, servings, categories, time })
        if (validation.length !== 0) { return res.status(400).json({ status: 'fail', message: validation }); }

        if (ingredients.length == 0 || direction.length == 0) {
            return res.status(400).json({ status: 'fail', message: 'Ingredients and Direction cannot be empty' });
        }


        const updatedRecipe = await Recipe.updateOne({ _id: id }, { $set: updateData })

        res.status(200).json({ status: 'success', updatedRecipe })

    } catch (error) {
        res.json({ messsage: error.message })
    }

    // res.json({messsage:'Page Load Succes2fully',body : req.body,image:req.file})
}

const deleteRecipe = async (req, res) => {

    const { id } = req.params

    try {
        await Recipe.deleteOne({ _id: id })

        res.status(200).json({ status: 'success' })

    } catch (error) {
        res.json({ messsage: error.message })
    }
}

module.exports = { addRecipe, getRecipesByUser, getRecipeById, updateRecipe, deleteRecipe, getRecipes }