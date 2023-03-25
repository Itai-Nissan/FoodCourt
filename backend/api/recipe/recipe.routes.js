const express = require('express')
const { addNewRecipe, getUserRecipe } = require('./recipe.controller')

const router = express.Router()

router.get('/:id', getUserRecipe)
router.put('/', addNewRecipe)

module.exports = router
