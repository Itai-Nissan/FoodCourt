const users = require("../../data/users.json")
const recipeService = require("../recipe/recipe.service")
const utilities = require("../../services/utilities")
const fs = require('fs')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    addFavToUser,
    removeFavFromUser,
    getByUsername,
    addUser,
    getUsers,
    getUserById,
    addRecipeToUser,
    removeRecipeFromUser,
    _writeToJson,
}

function getUsers() {
    return Promise.resolve(users)
}

async function addFavToUser(user, recipe) {
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ _id: new ObjectId(user._id) }, { $push: { userFavorite: recipe } })
    console.log('pushed');
    const userToSet = await getUserById(user._id)
    const userRecipes = await recipeService.getAllUserRecipes(user)
    const authUser = { userToSet, userRecipes }
    return Promise.resolve(authUser)
}

async function removeFavFromUser(user, recipeId) {
    const collection = await dbService.getCollection('user')
    const userToUpdate = await getUserById(user._id)
    userToUpdate.userFavorite.forEach((recipe, index) => {
        if (recipe._id === recipeId) {
            console.log('match')
            userToUpdate.userFavorite.splice(index, 1)
        }
    })
    await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: { ...userToUpdate } })
    const userToSet = await getUserById(user._id)
    const userRecipes = await recipeService.getAllUserRecipes(user)
    const authUser = { userToSet, userRecipes }
    return Promise.resolve(authUser)
}

async function getUserById(id) {
    try {
        const collection = await dbService.getCollection('user')
        const userToReturn = await collection.findOne({ _id: new ObjectId(id) })
        return userToReturn
    } catch (err) {
        // logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function getByUsername(userName) {
    try {
        const collection = await dbService.getCollection('user')
        console.log('getByUsername:', userName);
        const userToReturn = await collection.findOne({ userName: userName })
        console.log('userToReturn:', userToReturn);
        return userToReturn
    } catch (err) {
        // logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function addUser(user) {
    let dateObj = new Date()
    let month = dateObj.getUTCMonth() + 1
    let day = dateObj.getUTCDate()
    let year = dateObj.getUTCFullYear()

    let memberSince = year + "/" + month + "/" + day
    try {
        const userToAdd = {
            fullName: user.fullName,
            userName: user.userName,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            userFavorite: [],
            userRecipe: [],
            memberSince,
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        const userToReturn = await getByUsername(userToAdd.fullName)
        delete userToReturn.userPassword
        return userToReturn
    } catch (err) {
        // logger.error('cannot insert user', err)
        throw err
    }
}

function _writeToJson() {
    let updatedUsers = users
    var jsonContent = JSON.stringify(updatedUsers)

    fs.writeFile("data/users.json", jsonContent, 'utf8', function (err) {
        // console.log('trying to write:', jsonContent);
        if (err) {
            console.log("An error occured while writing JSON Object to File.")
            return console.log(err);
        }

        console.log("JSON file has been saved in user service")
    })
}

async function addRecipeToUser(userId, recipe) {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ userName: userName })
    user.userRecipe.push(recipe)
    const userToReturn = await collection.updateOne({ _id: userId }, { $set: { ...user } })
    return userToReturn
}

function removeRecipeFromUser(userId, recipeId) {
    let userToAdd
    users.forEach((userToSearch) => {
        if (userId === userToSearch._id) {
            userToAdd = userToSearch
        }
    })
    userToAdd.userFavorite.map((recipeToSearch, index) => {
        if (recipeToSearch.id === recipeId) {
            userToAdd.userFavorite.splice(index, 1)
            _writeToJson()
        }
    })
    return Promise.resolve(userToAdd)
}
