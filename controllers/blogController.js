const Blog = require('../models/blog')

getAll = async (req,res)=>{
    const category = req.query.category.toLowerCase()
    if(category){
        const result = await Blog.find()
        data = result.filter(blog=>blog.category.toLowerCase()==category)
        res.status(200).json(data)
    }else{
        try{
            const blogList = await Blog.find().sort({ createdAt: -1 });
            res.status(200).json(blogList)
        }catch(error){
            res.json(500).json(error)
        }
    }
}

getDetail = async (req,res)=>{
    const id = req.params.id
    try{
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    }catch(error){
        res.status(500).json('Loi server')
    }
}


create = async (req,res)=>{
    try{
        const blogNew = new Blog(req.body)
        const blogSaved = await blogNew.save()
        res.status(200).json(blogSaved)
    }catch(error){
        res.status(500).json('Loi server')
    }
}

update = async (req,res)=>{
    const id = req.params.id
    try{
        const blogExist = await Blog.findById(id)
        try{
            const blogUpdate = await Blog.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(200).json(blogUpdate)
        }catch(error){
            res.status(500).json('Loi server')
        }
    }catch(error){
        res.status(400).json('Blog not exist')
    }
}

deleteAll = async (req,res)=>{
    try{
        const deleteAll = await Blog.deleteMany()
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

deleteOne = async (req,res)=>{
    try{
        const resultDelete = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json('Delete success')
    }catch(error){
        res.status(500).json('Loi server')
    }
}

module.exports = {
    getAll,
    getDetail,
    create,
    update,
    deleteAll,
    deleteOne
}