const express = require('express')
const { addNewRecipe } = require('./recipe.controller')

const router = express.Router()

router.put('/', addNewRecipe)

module.exports = router
