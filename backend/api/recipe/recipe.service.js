const userRecipe = require("../../data/userRecipe.json")
const utilities = require("../../services/utilities")
const userService = require("../user/user.service")
const cloudinary = require("../../services/cloudinary")
const fs = require('fs')

async function getusersRecipe(filterBy) {
  let recipeToReturn = null
  if (!filterBy) {
    recipeToReturn = userRecipe
  } else {
    userRecipe.forEach((recipe) => {
      if (recipe.name == filterBy) {
        recipeToReturn = recipe
      }
    })
  }
  return recipeToReturn
}

async function getRecipeById(id) {
  let recipeToReturn = null
  userRecipe.forEach((recipe) => {
    if (recipe.id === id)
      recipeToReturn = recipe
  })
  return recipeToReturn
}

async function addRecipe(user, recipe) {
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let createDate = year + "/" + month + "/" + day

  try {
    const imgUrl = await cloudinary.uploadImage(recipe.thumbnail_url)

    const recipeToAdd = {
      id: utilities.randomId(),
      userId: user._id,
      name: recipe.name,
      country: recipe.country,
      sections: recipe.sections,
      instructions: recipe.instructions,
      thumbnail_url: imgUrl,
      credits: [
        {
          name: user.fullName
        }
      ],
      original_video_url: recipe.original_video_url,
      createDate,
    }
    userRecipe.push(recipeToAdd)
    _writeToJson()
    const userToReturn = await userService.addRecipeToUser(user._id, recipeToAdd)
    return userToReturn
  } catch (err) {
    logger.error('cannot insert new recipe', err)
    throw err
  }
}

function _writeToJson() {
  let updatedUsers = userRecipe
  var jsonContent = JSON.stringify(updatedUsers)


  fs.writeFile("data/userRecipe.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.")
      return console.log(err)
    }

    console.log("JSON file has been saved in recipe service")
  })
}

module.exports = {
  addRecipe,
  getRecipeById,
  getusersRecipe,
  _writeToJson,
}