// const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
// const logger = require('../../services/logger.service')

async function login(userName, userPassword) {
  // logger.debug(`auth.service - login with username: ${username}`)
  const user = await userService.getByUsername(userName)
  if (!user || user === null || user === undefined || user.userPassword !== userPassword) return Promise.reject('Invalid username or password')
  //   const match = await bcrypt.compare(password, user.password);
  //   if (!match) return Promise.reject('Invalid username or password');

  return user
}

async function signup({ _id, userName, userPassword, fullName, userEmail }) {
  // logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
  if (!userName || !userPassword || !fullName) return Promise.reject('fullname, username and password are required!')
  // const hash = await bcrypt.hash(password, saltRounds)
  return userService.addUser({ _id, userName, userPassword, fullName, userEmail })
}

module.exports = {
  signup,
  login,
}
