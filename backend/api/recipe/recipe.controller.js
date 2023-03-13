const recipeService = require('./recipe.service')
// const logger = require('../../services/logger.service')

async function addNewRecipe(req, res) {
  const { userId, recipe } = req.body
  // console.log('recipe controller:', recipe)
  try {
    const newRecipe = await recipeService.addRecipe(userId, recipe)
    let recipeToReturn = { ...newRecipe }
    // console.log('recipe controller:', recipeToReturn)
    // req.session.userName = userToSet
    res.json(recipeToReturn)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

module.exports = {
  addNewRecipe,
}
