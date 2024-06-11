const UserAuth = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const salt = 10;

const createToken = (response) => {
    return jwt.sign({
        id: response._id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
    },
        process.env.SECRET,
        { expiresIn: '2h' }
    )
}

const createUser = async(req, res) => {
    const {email,firstName, lastName, password} = req.body
    console.log('create acc for: ', email)

    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not a valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await UserAuth.findOne({ email })
    if (exists) {
        return res.status(400).json({ error: 'Email already in use' })
        // throw Error('Email already in use')
    }

    const hash = await bcrypt.hash(password, salt)

    try {
        const user = await UserAuth.create({
            email,
            firstName,
            lastName,
            password: hash
        })
        res.status(200).json({ message: 'User created successfully', user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const login = async(req, res) => {
    const {email, password} = req.body
    console.log('email: ',email,'password: ',password)
    try{
        const user = await UserAuth.findOne({email}).lean()
        if(!user){
            return res.status(401).json({ message: 'user with email not found' })
        }
        if(await bcrypt.compare(password, user.password)){
            //create a JWT token
            token = createToken(user)
            return res.status(200).json({ user, token })
        }
        return res.status(500).json({ error: 'invalid password' })
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    login
}