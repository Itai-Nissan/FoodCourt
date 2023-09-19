const recipeService = require('./recipe.service')
// const logger = require('../../services/logger.service')

async function addNewRecipe(req, res) {
  console.log('addNewRecipe');
  const { user, recipe } = req.body
  try {
    const newRecipe = await recipeService.addRecipe(user, recipe)
    let authUser = newRecipe
    const userToSet = authUser.user
    const userRecipes = authUser.allUserRecipes

    res.json({
      userToSet,
      userRecipes
    })

  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function removeRecipe(req, res) {
  
  const { user, recipe } = req.body
  try {
    const newRecipe = await recipeService.removeUserRecipe(user, recipe)
    let authUser = newRecipe
    const userToSet = authUser.user
    const userRecipes = authUser.allUserRecipes
    res.json({
      userToSet,
      userRecipes
    })

  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function editUserRecipe(req, res) {
  const { user, recipe } = req.body
  try {
    const editedRecipe = await recipeService.editRecipe(user, recipe)
    let authUser = editedRecipe
    const userToSet = authUser.user
    const userRecipes = authUser.allUserRecipes

    res.json({
      userToSet,
      userRecipes
    })

  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function getUserRecipeById(req, res) {
  const { id } = req.query
  try {
    const recipeToReturn = await recipeService.getRecipeById(id)
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function getUserRecipe(req, res) {
  const filterBy = req.query.filterBy
  const skip = req.query.startPoint
  const limit = req.query.amountToRturn
  try {
    const recipeToReturn = await recipeService.getAllRecipes(filterBy, skip, limit)
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

module.exports = {
  addNewRecipe,
  editUserRecipe,
  getUserRecipeById,
  getUserRecipe,
  removeRecipe,
}
