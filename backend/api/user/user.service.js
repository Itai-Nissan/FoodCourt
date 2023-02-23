const users = require("../../data/users.json")
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
    let userToSet
    users.forEach((userToSearch) => {
        if (user._id === userToSearch._id) {
            userToSet = {
                _id: userToSearch._id,
                userName: userToSearch.userName,
                userEmail: userToSearch.userEmail,
                userFavorite: userToSearch.userFavorite
            }
            userToSet.userFavorite.push(food)
        }
    })
    return Promise.resolve(userToSet)
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

    let memberSince = year + "/" + month + "/" + day;
    try {
        const userToAdd = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            memberSince,
        }
        _writeToJson(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _writeToJson(userToAdd) {
    let updatedUsers = users
    updatedUsers.push(userToAdd)
    var jsonContent = JSON.stringify(updatedUsers)

    fs.writeFile("data/users.json", jsonContent, 'utf8', function (err) {
        console.log('trying to write:', jsonContent);
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    })
}
