const express = require("express")
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAll)

router.get('/:id',categoryController.getDetail)

router.put('/:id',categoryController.update)

router.post('/',categoryController.store)

router.delete('/',categoryController.deleteMany)

router.delete('/:id',categoryController.deleteOne)

module.exports = router