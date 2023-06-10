const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, surname, email, password } = req.body

    if(!name || !surname || !email || !password){
        res.status(400)
        throw new Error('Lütfen tüm alanları doldurun')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Kullanıcı zaten kayıtlı')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, surname, email, password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Geçersiz input')
    }

})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Geçersiz input')
    }

})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'User data display'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}