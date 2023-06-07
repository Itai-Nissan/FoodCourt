const recipeService = require('./recipe.service')
// const logger = require('../../services/logger.service')

async function addNewRecipe(req, res) {
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

async function editUserRecipe(req, res) {
  // console.log('recipe controller', req.body);
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
    // let recipeToReturn = { ...newRecipe }
    // // req.session.userName = userToSet
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function getUserRecipe(req, res) {
  const filterBy = req.query.filterBy
  const startPoint = req.query.startPoint
  const amountToRturn = req.query.amountToRturn
  try {
    const recipeToReturn = await recipeService.getAllRecipes(filterBy, startPoint, amountToRturn)
    // let recipeToReturn = { ...newRecipe }
    // // req.session.userName = userToSet
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
}
