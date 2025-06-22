//import router from express
const router = require('express').Router()

//import multer libarry
const multer = require('multer')

const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(file)
        const setFileName = Date.now() + '-' + Math.round(Math.random() * 1E4);
        const extension = path.extname(file.originalname)
        cb(null, setFileName + extension)
    }
})

const upload = multer({ storage: storage })


//import controllers data
const { authSignup, authLogin, authLogout, getUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getUser)
router.post('/login', upload.none(), authLogin)
router.post('/signup', upload.single('photo'), authSignup)
router.post('/logout', authLogout)

module.exports = router