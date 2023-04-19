const User = require('../models/user')


deleteAll = async (req,res)=>{
    try{
        const resultDelete = await User.deleteMany()
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

getAll = async (req,res)=>{
    const name = req.query.name
    if(name){ //search name
        try{
            const result =await User.find({username: name})
            res.status(200).json(result)
        }catch(error){
            res.status(500).json('Loi Server')
        }
    }else{
        try{
            const list_user = await User.find()
            res.status(200).json(list_user)
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = {
    deleteAll,
    getAll
}