const recipeService = require('./recipe.service')
// const logger = require('../../services/logger.service')

async function addNewRecipe(req, res) {
  console.log('recipe controller');
  const { userId, recipe } = req.body
  try {
    const newRecipe = await recipeService.addRecipe(userId, recipe)
    let recipeToReturn = { ...newRecipe }
    console.log(recipeToReturn)
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
