const recipes = require("../../data/recipes.json")
const tastyRecipes = require("../../data/tastyRecipes.json")
const updatedTastyRecipe = require("../../data/updatedTastyRecipe.json")
const userRecipes = require("../../data/userRecipes.json")
const utilities = require("../../services/utilities")
const cloudinary = require("../../services/cloudinary")
const fs = require('fs')
const userService = require('../user/user.service')

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy, skip, limit) {
  const { query, order } = _buildCriteria(filterBy)
  skip = Number(skip)
  limit = Number(limit)

  const recipeCollection = await dbService.getCollection('recipe')
  const recipes = await recipeCollection
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort(order)
    .toArray()

  const collectionCount = await recipeCollection.count(query)
  const collectionData = {
    recipes,
    collectionCount
  }

  return collectionData
}

function _buildCriteria(filterBy, sortBy) {
  let { text, category } = filterBy
  let query = {}
  let order = {}

  if (text) {
    const textCriteria = { $regex: text, $options: 'i' }
    console.log('textcriteria:', textCriteria);
    query.$or = [
      { ['description']: textCriteria },
      { ['name']: textCriteria },
      { ['userId']: textCriteria },
      { ['{credit:name}']: textCriteria },
      // { ['topics']: textCriteria },
    ]
  }

  if (category) {
    const categoryCriteria = { $regex: category, $options: 'i' }
    query.$or = [
      // { title: categoryCriteria },
      { description: categoryCriteria },
      { ['name']: categoryCriteria },
    ]
  }
  return { query, order }
}

async function _add(recipe, collectionToInsert) {
  // const collection = await dbService.getCollection('recipe')
  // recipes.map((recipe) => {
  //   collection.insertOne(recipe)
  // })
  const collection = await dbService.getCollection(collectionToInsert)
  const recipeToReturn = await collection.insertOne(recipe)
  return recipeToReturn
}

async function _update(recipe) {
  var id = new ObjectId(recipe._id)
  delete recipe._id
  const collection = await dbService.getCollection('recipe')
  await collection.updateOne({ _id: id }, { $set: { ...recipe } })
  recipe._id = id
  return recipe
}

async function getAllUserRecipes(user) {
  let recipeQuery = {}
  const userId = user._id.toString()
  recipeQuery.$or = [
    { ['author']: userId }
  ]
  const collection = await dbService.getCollection('recipe')
  const foodList = await collection.find(recipeQuery).toArray()
  return foodList
}

async function getAllRecipes(filterBy, skip, limit) {
  const recipesQuery = await query(filterBy, skip, limit)
  const count = recipesQuery.collectionCount
  const recipeList = recipesQuery.recipes
  const recipesData = { recipeList, count }
  return recipesData
}

async function fetchFromApi() {
  // console.log('before cleaning:', tastyRecipes.length);

  // const cleanList = tastyRecipes.reduce((accumulator, current) => {
  //   if (!accumulator.find((item) => item.id === current.id)) {
  //     accumulator.push(current);
  //   }
  //   return accumulator;
  // }, []);

  // console.log('cleanList:', cleanList.length);

  // const options = {
  //   method: 'GET',
  //   url: 'https://tasty.p.rapidapi.com/recipes/list',
  //   params: { from: '280', size: '40', q: filterBy ? filterBy : '' },
  //   headers: {
  //     'X-RapidAPI-Key': "",
  //     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  //   }
  // }

  // await axios.request(options).then(function (response) {
  //   console.log('fetching recipes', tastyRecipes.length);
  //   // foodList.push(recipes)
  //   response.data.results.map((recipes) => {
  //     // foodList.push(recipes)
  //     tastyRecipes.push(recipes)
  //   })

  // console.log('before fetching', tastyRecipeDetails.length);
  // let recipeOnJson = false
  // tastyRecipes.map((recipe, index) => {
  //   tastyRecipeDetails.map((detailedRecipe) => {
  //     if (detailedRecipe.id === recipe.id) {
  //       recipeOnJson = true
  //     }
  //     if (recipeOnJson) {
  //       recipeOnJson = false
  //       return
  //     } else {
  //       setTimeout(() => {
  //         getRecipeById(recipe.id)
  //           .then((detailedRecipe) => {
  //             console.log('fetching recipeDetails', detailedRecipe.id);
  //             tastyRecipeDetails.push(detailedRecipe)
  //             _writeToJson('tastyRecipeDetails', tastyRecipeDetails)
  //           })
  //       }, 2000 * index)
  //     }
  //   })
  // })

  // console.log('after fetching', tastyRecipeDetails.length);
  // _writeToJson('tastyRecipes', tastyRecipes)
  // _writeToJson('tastyRecipeDetails', tastyRecipeDetails)

  // }).catch(function (error) {
  //   console.error(error)
  // })

}

async function getRecipeById(id) {
  const collection = await dbService.getCollection('recipe')
  const recipe = await collection.findOne({ ['_id']: new ObjectId(id) })
  return recipe
}

async function addRecipe(user, recipe) {
  let dateObj = new Date()

  try {
    let imgUrl
    if (recipe.thumbnail_url) {
      imgUrl = await cloudinary.uploadImage(recipe.thumbnail_url)
    }

    let vidUrl
    if (recipe.original_video_url) {
      vidUrl = await cloudinary.uploadVideo(recipe.original_video_url)
    }

    const recipeToAdd = {
      id: utilities.randomId(),
      author: user._id,
      name: recipe.name,
      country: recipe.country,
      description: recipe.description,
      sections: recipe.sections,
      instructions: recipe.instructions,
      thumbnail_url: imgUrl,
      credits: [
        {
          name: user.fullName
        }
      ],
      original_video_url: vidUrl,
      create_at: dateObj,
    }

    await _add(recipeToAdd, 'recipe')

    const allUserRecipes = await getAllUserRecipes(user)
    return ({
      user,
      allUserRecipes
    })
  } catch (err) {
    logger.error('cannot insert new recipe', err)
    throw err
  }
}

async function editRecipe(user, recipe) {
  // console.log('update:', recipe);

  try {
    let imgUrl = recipe.thumbnail_url
    if (typeof recipe.thumbnail_url === 'object') {
      // imgUrl = await cloudinary.uploadImage(recipe.thumbnail_url)
    }

    let vidUrl
    if (recipe.original_video_url) {
      // vidUrl = await cloudinary.uploadVideo(recipe.original_video_url)
    }


    const editedRecipe = {
      _id: recipe._id,
      id: recipe.id,
      author: user._id,
      name: recipe.name,
      country: recipe.country,
      description: recipe.description,
      sections: recipe.sections,
      instructions: recipe.instructions,
      thumbnail_url: imgUrl,
      credits: [
        {
          name: user.fullName
        }
      ],
      original_video_url: vidUrl,
    }

    await _update(editedRecipe, 'recipe')

    const allUserRecipes = await getAllUserRecipes(user)
    return ({
      user,
      allUserRecipes
    })
  } catch (err) {
    logger.error('cannot insert new recipe', err)
    throw err
  }
}

function _writeToJson(file, db) {
  console.log('writing to jSON');
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
  editRecipe,
  getRecipeById,
  getAllRecipes,
  getAllUserRecipes,
  fetchFromApi,
  _writeToJson,
}