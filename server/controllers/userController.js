const User = require('../models/user')
const helper = require('../utils/helper')

const getUser = async (req, res) => {
    const { id } = req.user

    try {

        const user = await User.findById(id).select('-password')

        if (!user) {
            return res.status(404).json({ status: 'fail', loggedIn: false, message: 'User not found!' })
        }

        return res.status(200).json({ status: 'success', loggedIn: true, user })

    } catch (error) {
        return res.status(500).json({ status: 'fail', loggedIn: false, message: error.message })
    }
}

const authSignup = async (req, res) => {
    const { name, email, password, confirm } = req.body
    let path
    // console.log(req.file)
    if (req.file) {
        path = req.file.filename;
    }
    try {
        //Validate all required fields
        const validation = helper.validationInputs({ name, email, password, confirm })
        if (validation.length !== 0) { return res.status(400).json({ message: validation }); }

        //Check user already exist
        const user = await User.findOne({ email });

        //If user exist terminate response bad request
        if (user) { return res.status(400).json({ status: 'fail', message: 'This email address already have account' }); }

        //Hash password
        const hashpassword = await helper.convertHash(password)

        //Save user in database
        const newUser = await User.create({ name, email, password: hashpassword, profilepic: path })

        //Generate token after save data
        const token = helper.generateToken(newUser._id)

        //If token fail to generate
        if (!token) { return res.status(500).json({ status: 'fail', message: 'Fail to generate token' }); }

        //Set cookie to client browser
        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        })

        //If all success
        return res.status(201).json({ status: 'success', token, message: "User created successfully" })
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error.message })
    }

}

const authLogin = async (req, res) => {

    console.log(req.body)
    const { email, password } = req.body

    try {
        //Validate email and password
        const validation = helper.validationInputs({ email, password })
        if (validation.length !== 0) { return res.status(400).json({ message: validation }); }

        //Check user exist
        const user = await User.findOne({ email })

        //If user not exist
        if (!user) { return res.status(404).json({ status: 'fail', message: 'User not found!' }) }

        //Compare password
        const comparePassword = await helper.verifyPassword(password, user.password)
        if (!comparePassword) { return res.status(401).json({ status: 'fail', message: 'Unauthorized access' }) }

        //Generate token
        const token = helper.generateToken(user._id)

        //If token fail to generate
        if (!token) { return res.status(500).json({ status: 'fail', message: 'Fail to generate token' }) }

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        })
        //Send response
        return res.status(200).json({ token, status: 'success', message: 'Login succesfully' })

    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error.message })
    }


}

const authLogout = async (req, res) => {
    const token = req.cookies.token

    if (token) {
        res.clearCookie('token')
        return res.json({ loggedIn: false })
    }
}

module.exports = { authSignup, authLogin, authLogout, getUser }