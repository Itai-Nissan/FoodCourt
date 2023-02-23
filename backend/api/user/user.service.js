const users = require("../../data/users.json")
const utilities = require("../../services/utilities")
const fs = require('fs');

module.exports = {
    addFavToUser,
    getByUsername,
    addUser,
    getUsers,
    getUserById,
    _writeToJson,
}

function getUsers() {
    return Promise.resolve(users)
}

function addFavToUser(user, food) {
    let userToAdd
    users.forEach((userToSearch) => {
        if (user._id === userToSearch._id) {
            userToAdd = userToSearch
            userToAdd.userFavorite.push(food)
            _writeToJson()
        }
    })
    return Promise.resolve(userToAdd)
}

async function getUserById(id) {
    id = parseInt(id)
    let user = null
    users.map((userById) => {
        if (userById._id === id) {
            user = userById
        }
    })
    return user
}

async function getByUsername(userName) {
    let user = {}
    const usersList = users
    try {
        await usersList.forEach((userToSet) => {
            if (userName === userToSet.userName) {
                user = userToSet
            }
        })
        return user
    } catch (err) {
        logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function addUser(user) {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let memberSince = year + "/" + month + "/" + day
    try {
        const userToAdd = {
            _id: utilities.randomId(),
            fullName: user.fullName,
            userName: user.userName,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            userFavorite: [],
            memberSince,
        }
        users.push(userToAdd)
        _writeToJson()
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _writeToJson() {
    let updatedUsers = users
    var jsonContent = JSON.stringify(updatedUsers)

    fs.writeFile("data/users.json", jsonContent, 'utf8', function (err) {
        // console.log('trying to write:', jsonContent);
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    })
}
