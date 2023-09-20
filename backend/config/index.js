require('dotenv').config()

let config

if (process.env.NODE_ENV === 'production') {
  console.log('prod');
  config = process.env.DB_URL
  // config = require('./prod')
} else {
  console.log('dev');
  config = require('./dev')
}

module.exports = config
