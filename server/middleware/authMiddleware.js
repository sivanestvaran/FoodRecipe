// const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const SECRET_CODE = process.env.SECRET_CODE;

    const token = req.cookies.token

    if (!token) {
        return res.status(200).json({ loggedIn: false })
    }

    jwt.verify(token, SECRET_CODE, (err, user) => {
        if (err) {
            return res.status(400).json({ status: 'fail', loggedIn: false, message: 'Invalid Token' })
        }

        req.user = user
        // console.log(user)
        next()
    })

}


module.exports = authMiddleware