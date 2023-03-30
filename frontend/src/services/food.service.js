import axios from "axios"
import { httpService } from './http.service.js'

export const foodService = {
    getFood,
    getById,
    addNewRecipe,
}

async function getFood(filterBy) {
    const KEY = 'foodDB'
    const ENDPOINT = 'recipe'

    let foodList = []
    // let foodList = localStorage.getItem(KEY) || {}
    // if (foodList.length > 0) {
    //     foodList = JSON.parse(foodList)
    // }

    // if (filterBy) {
    const usersRecipes = await httpService.get(ENDPOINT + '/', filterBy)

    if (usersRecipes) {
        if (usersRecipes.length > 1) {
            usersRecipes.forEach((recipe) => {
                foodList.push(recipe)
            })
        }
        if (usersRecipes.length === undefined) {
            foodList.push(usersRecipes)
        }
    }
    console.log('Fetching from server before:', foodList)
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: { from: '0', size: '50', q: filterBy.text },
        headers: {
            'X-RapidAPI-Key': 'a38ff25a46msh308ca696239e976p1f5e31jsnd96340e8e05f',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    }

    await axios.request(options).then(function (response) {
        response.data.results.map((recipe) => {
            foodList.push(recipe)
        })
        _save(KEY, foodList)
    }).catch(function (error) {
        console.error(error)
    })
    // console.log('Fetching from server after:', foodList)
    // }
    return foodList
}

async function getById(id) {
    const ENDPOINT = 'recipe'

    const KEY = 'foodByIdDb'
    let foodById = null

    foodById = await httpService.get(ENDPOINT + '/:id', { id })

    if (!foodById) {
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
            foodById = response.data
            _save(KEY, foodById)
        }).catch(function (error) {
            console.error(error);
        })
    }
    return foodById
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

async function addNewRecipe(user, recipe) {

    const newRecipe = await httpService.put('recipe', { user, recipe })
    if (newRecipe) {
    }
    return newRecipe
}


