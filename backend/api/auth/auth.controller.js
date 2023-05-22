const authService = require('./auth.service')
const recipeService = require('../recipe/recipe.service')
// const logger = require('../../services/logger.service')

async function login(req, res) {
  const { userName, userPassword } = req.body
  try {
    const user = await authService.login(userName, userPassword)
    const userRecipes = await recipeService.getAllUserRecipes(user)
    let userToSet = { ...user }
    delete userToSet.userPassword
    req.session.userName = userToSet
    res.json({
      userToSet,
      userRecipes
    })
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    // const { userName, userPassword } = req.body
    const userToSet = await authService.signup(req.body)
    const userRecipes = []

    // const user = await authService.login(userName, userPassword)
    // req.session.user = user
    res.json({
      userToSet,
      userRecipes
    })
  } catch (err) {
    // logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req, res) {
  try {
    req.session.destroy()
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}

module.exports = {
  login,
  signup,
  logout,
}
