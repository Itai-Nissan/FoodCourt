const express = require('express')
const { addNewRecipe, getUserRecipeById, getUserRecipe } = require('./recipe.controller')

const router = express.Router()

router.get('/:id', getUserRecipeById)
router.get('/', getUserRecipe)
router.put('/', addNewRecipe)

module.exports = router
