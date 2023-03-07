const userRecipe = require("../../data/userRecipe.json")
const utilities = require("../../services/utilities")
const fs = require('fs');

async function addRecipe(userId, recipe) {
  console.log('recipe service userId:', userId)
  console.log('recipe service recipe:', recipe)
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let createDate = year + "/" + month + "/" + day

  try {
    const recipeToAdd = {
      _id: utilities.randomId(),
      userId,
      name: recipe.name,
      country: recipe.country,
      section: recipe.section,
      instructions: recipe.instructions,
      createDate,
    }
    userRecipe.push(recipeToAdd)
    _writeToJson()
    return recipeToAdd
  } catch (err) {
    logger.error('cannot insert new recipe', err)
    throw err
  }
}

function _writeToJson() {
  let updatedUsers = userRecipe
  console.log('writing to json:', updatedUsers);
  var jsonContent = JSON.stringify(updatedUsers)


  fs.writeFile("data/userRecipe.json", jsonContent, 'utf8', function (err) {
    // console.log('trying to write:', jsonContent);
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  })
}

module.exports = {
  addRecipe,
  _writeToJson,
}
