const userRecipe = require("../../data/userRecipe.json")
const utilities = require("../../services/utilities")
const userService = require("../user/user.service")
const fs = require('fs')

async function addRecipe(user, recipe) {
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let createDate = year + "/" + month + "/" + day

  try {
    const recipeToAdd = {
      _id: utilities.randomId(),
      userId: user._id,
      name: recipe.name,
      country: recipe.country,
      section: recipe.section,
      instructions: recipe.instructions,
      thumbnail_url: recipe.thumbnail_url,
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
  _writeToJson,
}
