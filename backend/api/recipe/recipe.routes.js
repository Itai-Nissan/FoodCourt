const express = require('express')
const { addNewRecipe, editUserRecipe, getUserRecipeById, getUserRecipe, removeRecipe } = require('./recipe.controller')

const router = express.Router()

router.get('/:id', getUserRecipeById)
router.get('/', getUserRecipe)
router.post('/', addNewRecipe)
router.put('/', editUserRecipe)
router.delete('/', removeRecipe)

module.exports = router
