const recipes = require("../../data/recipes.json")
const userRecipes = require("../../data/userRecipes.json")
const utilities = require("../../services/utilities")
const userService = require("../user/user.service")
const cloudinary = require("../../services/cloudinary")
const axios = require('axios')
const fs = require('fs')


async function getAllUserRecipes(user) {
  let foodList = []

  userRecipes.forEach((userRecipe) => {
    if (userRecipe.userId === user._id)

      recipes.forEach((recipe) => {
        if (recipe.id === userRecipe.recipeId) {
          foodList.push(recipe)
        }
      }
      )
  })
  return foodList
}

async function getAllRecipes(filterBy) {
  let recipeToReturn = null
  let foodList = []

  if (!filterBy) {
    recipeToReturn = recipes
  } else {
    recipes.forEach((recipe) => {
      if (recipe.name.toLowerCase().includes(filterBy.toLowerCase())) {
        recipeToReturn = recipe
      }
    })
  }

  if (recipeToReturn) {
    if (recipeToReturn.length > 1) {
      recipeToReturn.forEach((recipe) => {
        foodList.push(recipe)
      })
    }
    if (recipeToReturn.length === undefined) {
      foodList.push(recipeToReturn)
    }
  }

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: { from: '0', size: 'All', q: filterBy ? filterBy : '' },
    headers: {
      'X-RapidAPI-Key': 'a38ff25a46msh308ca696239e976p1f5e31jsnd96340e8e05f',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  }

  await axios.request(options).then(function (response) {
    response.data.results.map((recipe) => {
      foodList.push(recipe)
    })
  }).catch(function (error) {
    console.error(error)
  })
  return foodList
}

async function getRecipeById(id) {
  let recipeToReturn = null
  recipes.forEach((recipe) => {
    if (recipe.id === id)
      recipeToReturn = recipe
  })

  if (!recipeToReturn) {
    console.log('Fectching byId from SERVER', id);
    const options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
      params: { id: id },
      headers: {
        'X-RapidAPI-Key': 'a38ff25a46msh308ca696239e976p1f5e31jsnd96340e8e05f',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };

    await axios.request(options).then(function (response) {
      recipeToReturn = response.data
    }).catch(function (error) {
      console.error(error);
    })
  }
  return recipeToReturn
}

async function addRecipe(user, recipe) {
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let createDate = year + "/" + month + "/" + day

  try {
    const imgUrl = 'await cloudinary.uploadImage(recipe.thumbnail_url)'
    // const imgUrl = await cloudinary.uploadImage(recipe.thumbnail_url)

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
    recipes.push(recipeToAdd)

    userRecipes.push({
      recipeId: recipeToAdd.id,
      userId: user._id
    })
    _writeToJson('recipes', recipes)
    _writeToJson('userRecipes', userRecipes)
    // const userToReturn = await userService.addRecipeToUser(user._id, recipeToAdd)
    return user
  } catch (err) {
    logger.error('cannot insert new recipe', err)
    throw err
  }
}

function _writeToJson(file, db) {
  let updatedUsers = db
  var jsonContent = JSON.stringify(updatedUsers)


  fs.writeFile(`data/${file}.json`, jsonContent, 'utf8', function (err) {
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
  getAllRecipes,
  getAllUserRecipes,
  _writeToJson,
}