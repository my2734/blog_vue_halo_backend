const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('/',blogController.getAll)

router.get('/:id',blogController.getDetail)

router.post('/', blogController.create)

router.put('/:id', blogController.update)

router.delete('/',blogController.deleteAll)

router.delete('/:id',blogController.deleteOne)

module.exports = router