const recipeService = require('./recipe.service')
// const logger = require('../../services/logger.service')

async function addNewRecipe(req, res) {
  const { user, recipe } = req.body
  try {
    const newRecipe = await recipeService.addRecipe(user, recipe)
    let recipeToReturn = { ...newRecipe }
    // req.session.userName = userToSet
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function getUserRecipe(req, res) {
  const { id } = req.query
  try {
    const recipeToReturn = await recipeService.getRecipeById(id)
    // let recipeToReturn = { ...newRecipe }
    // // req.session.userName = userToSet
    console.log(recipeToReturn)
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}


module.exports = {
  addNewRecipe,
  getUserRecipe
}
