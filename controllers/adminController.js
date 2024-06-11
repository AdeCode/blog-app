const User = require('../models/userModel')

const getAllUsers = async(req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({ users: users })
    }catch(error){
        return res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getAllUsers,
}
