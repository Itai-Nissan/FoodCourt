const recipes = require("../../data/recipes.json")
const tastyRecipes = require("../../data/tastyRecipes.json")
const updatedTastyRecipe = require("../../data/updatedTastyRecipe.json")
const userRecipes = require("../../data/userRecipes.json")
const utilities = require("../../services/utilities")
const cloudinary = require("../../services/cloudinary")
const fs = require('fs')

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const { query, order } = _buildCriteria(filterBy)

  const collection = await dbService.getCollection('tastyRecipe')

  const tastyRecipes = await collection
    .find(query)
    .sort(order)
    .toArray()

  return tastyRecipes
}

function _buildCriteria(filterBy, sortBy) {
  console.log('_buildCriteria filterBy:', filterBy);
  const { text, category } = filterBy
  let query = {}
  let order = {}

  if (text) {
    console.log('_buildCriteria text', text)
    const textCriteria = { $regex: text, $options: 'i' }
    query.$or = [
      // { title: textCriteria },
      { ['description']: textCriteria },
      { ['name']: textCriteria },
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



  // if (userId) {
  //   query['owner._id'] = userId
  // }

  // const deliveryTime = parseInt(delivery)
  // if (!isNaN(deliveryTime)) {
  //   query.delivery = { $lte: deliveryTime }
  // }

  // if (price) {

  //   const p = {}
  //   if (price.min >= 0) {
  //     p.$gte = price.min
  //   }

  //   if (price.max) {
  //     p.$lte = price.max
  //   }

  //   if (price.min || price.max) {
  //     query.price = p
  //   }
  // }

  // if (sortBy) {
  //   order = { [sortBy]: 1 }
  // }

  return { query, order }
}

async function add() {
  const collection = await dbService.getCollection('tastyRecipe')
  updatedTastyRecipe.map((recipe) => {
    collection.insertOne(recipe)
  })
  // return ops[0]
}

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

async function getAllRecipes(filterBy, startPoint, endPoint) {
  let foodList = []
  let count

  // add()
  foodList = await query(filterBy)
  count = foodList.length
  // utilities.cleaningJson()
  // utilities.sliceJson()

  // if (filterBy.category) filterBy.text = filterBy.category
  // if (!filterBy || filterBy.text.toLowerCase() === 'all' || filterBy.text.toLowerCase() === '') {
  //   count = recipes.length + tastyRecipes.length
  //   if (startPoint > 0) {
  //     foodList = tastyRecipes
  //   } else {
  //     foodList = recipes.concat(tastyRecipes)
  //   }
  // } else {
  //   recipes.forEach((recipe) => {
  //     if (recipe.name.toLowerCase().includes(filterBy.text.toLowerCase())) {
  //       foodList.push(recipe)
  //     }
  //   })
  //   tastyRecipes.forEach((recipe) => {
  //     if (recipe.name.toLowerCase().includes(filterBy.text.toLowerCase())) {
  //       foodList.push(recipe)
  //     }
  //   })
  //   count = foodList.length
  // }

  // fetchFromApi()
  console.log('count:', count);

  foodList = foodList.slice(startPoint, endPoint)
  const recipesData = { foodList, count }
  console.log('recipesData.count:', recipesData.count);
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
  let recipeToReturn = null
  let idToInt = 0

  if (typeof id === String) idToInt = parseInt(id, base)

  recipes.forEach((recipe) => {
    if (recipe.id == id)
      recipeToReturn = recipe
    return
  })
  tastyRecipes.forEach((recipe) => {
    if (recipe.id == id) {
      recipeToReturn = recipe
    }
    return
  })

  // console.log('getRecipeById:', recipeToReturn);
  // if (!recipeToReturn) {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
  //     params: { id: id },
  //     headers: {
  //       'X-RapidAPI-Key': "",
  //       'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  //     }
  //   }

  //   await axios.request(options).then(function (response) {
  //     recipeToReturn = response.data
  //     // console.log(recipeToReturn);
  //     // tastyRecipeDetails.push(recipeToReturn)
  //     // _writeToJson('tastyRecipeDetails', tastyRecipeDetails)

  //   }).catch(function (error) {
  //     console.error(error);
  //   })
  // }

  return recipeToReturn
}

async function addRecipe(user, recipe) {
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let createDate = year + "/" + month + "/" + day

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
      original_video_url: vidUrl,
      createDate,
    }

    recipes.push(recipeToAdd)
    userRecipes.push({
      recipeId: recipeToAdd.id,
      userId: user._id
    })

    _writeToJson('recipes', recipes)
    _writeToJson('userRecipes', userRecipes)

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

  try {
    let imgUrl = recipe.thumbnail_url
    if (typeof recipe.thumbnail_url === 'object') {
      imgUrl = await cloudinary.uploadImage(recipe.thumbnail_url)
    }

    let vidUrl
    if (recipe.original_video_url) {
      vidUrl = await cloudinary.uploadVideo(recipe.original_video_url)
    }


    const editedRecipe = {
      id: recipe.id,
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
      original_video_url: vidUrl,
    }

    recipes.map((recipe, index) => {
      if (recipe.id === editedRecipe.id) {
        recipes[index] = editedRecipe
        return
      }
    })

    _writeToJson('recipes', recipes)
    _writeToJson('userRecipes', userRecipes)

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
  add,
  _writeToJson,
}