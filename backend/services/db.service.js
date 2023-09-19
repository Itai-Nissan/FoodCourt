const MongoClient = require('mongodb').MongoClient
// const logger = require('./logger.service')
const config = require('../config')

module.exports = {
  getCollection,
}

const dbName = 'cutting-board-db'

var dbConn = null

async function getCollection(collectionName) {
  try {
    const db = await connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    console.log(err);
    // logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  console.log('connectin');
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connectin after client');
    const db = client.db(dbName)
    console.log('connectin after db');
    dbConn = db
    return db
  } catch (err) {
    console.log(err);
    // logger.error('Cannot Connect to DB', err)
    throw err
  }
}
