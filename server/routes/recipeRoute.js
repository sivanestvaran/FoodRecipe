const { addRecipe, getRecipesByUser, getRecipeById, updateRecipe, getRecipes, deleteRecipe } = require('../controllers/recipeController')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../', 'uploads/recipes')

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, 'uploads/recipes')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E4)
        const extension = path.extname(file.originalname)
        cb(null, filename + extension)
    }

})


const authMiddleware = require('../middleware/authMiddleware')

const upload = multer({ storage: storage })

router.post('/add', authMiddleware, upload.single('image'), addRecipe)
router.put('/updaterecipe/:id', authMiddleware, upload.single('image'), updateRecipe)
router.delete('/deleterecipe/:id', authMiddleware, deleteRecipe)
router.get('/allrecipesbyuser', authMiddleware, getRecipesByUser)
router.get('/allrecipes', getRecipes)
router.get('/getrecipe/:id', authMiddleware, getRecipeById)


module.exports = router