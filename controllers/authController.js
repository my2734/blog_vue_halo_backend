const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
register = async (req,res)=>{
    try{
        const userExist =await User.findOne({username: req.body.username})
        if(userExist){
            res.status(401).json('User exist')
        }
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password,salt)
        const userNew = new User(req.body)
        try{
            const userSaved = await userNew.save()
            const {password,...info} = userSaved._doc
            res.status(200).json(info)
        }catch(error){
            res.status(500).json(error)
        }
    }catch(error){
        res.status(500).json(error)
    }
}

login = async (req,res)=>{
    try{
        const userExist = await User.findOne({username: req.body.username})
        // if(!userExist){
        //     res.status(401).json('User not exist. Please register')
        // }

        const statusPassword = await bcrypt.compare(req.body.password, userExist.password)
        if(!statusPassword){
            res.status(400).json('Password wrong')
        }
        const TOKEN_SERECT = process.env.TOKEN_SERECT
        const token = jwt.sign({
            username: userExist.username,
            _id : userExist._id
        },TOKEN_SERECT)
        res.status(200).json(token)
    }catch(error){
        res.status(401).json('User not exist. Please register')
    }
}


module.exports = {
    register,
    login
}