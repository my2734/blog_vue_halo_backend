const Category = require('../models/category')

const getAll = async (req,res)=>{
    try{
        const data = await Category.find()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

const getDetail = async (req,res)=>{
    const id = req.params.id
    try{
        const data = await Category.findById(id)
        res.status(200).json(data)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

const update = async (req,res)=>{
    const id = req.params.id
    try{
        const data = await Category.findByIdAndUpdate(id,{$set: req.body}, {new:true})
        res.status(200).json('Update category success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

const store = async (req,res)=>{
    try{
        const category = new Category(req.body)
        const result = await category.save()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

const deleteMany = async (req,res)=>{
    try{
        const result = await Category.deleteMany()
        res.status(200).json('Delete many successs')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

const deleteOne = async (req,res)=>{
    const id = req.params.id
    try{
        const result =await Category.findByIdAndDelete(id)
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

module.exports = {
    getAll: getAll,
    getDetail: getDetail,
    update: update, 
    store: store,
    deleteMany: deleteMany,
    deleteOne:deleteOne
}