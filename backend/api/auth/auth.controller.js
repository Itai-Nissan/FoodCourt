const authService = require('./auth.service')
// const logger = require('../../services/logger.service')

async function login(req, res) {
  const { userName, userPassword } = req.body
  try {
    const user = await authService.login(userName, userPassword)
    delete user.userPassword
    req.session.userName = user
    res.json(user)
  } catch (err) {
    // logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  // console.log('signing up auth controller', req.body)
  try {
    const { userName, userPassword } = req.body
    // Never log passwords
    // logger.debug(fullname + ', ' + username + ', ' + password)
    const account = await authService.signup(req.body)
    // console.log('auth controller loging account:', account);
    // logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(userName, userPassword)
    req.session.user = user
    res.json(user)
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
