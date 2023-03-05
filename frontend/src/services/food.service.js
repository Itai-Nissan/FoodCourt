import axios from "axios"
import { httpService } from './http.service.js'

export const foodService = {
    getFood,
    getById,
    addNewRecipe,
}

async function getFood(filterBy) {
    const KEY = 'foodDB'
    let foodList = localStorage.getItem(KEY) || {}
    if (foodList.length > 0) {
        foodList = JSON.parse(foodList)
    }
    if (filterBy) {
        console.log('Fetching from server')
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
            foodList = response.data.results
            _save(KEY, foodList)
        }).catch(function (error) {
            console.error(error)
        })
    }
    return foodList
}

async function getById(id) {
    const KEY = 'foodByIdDb'
    let foodById = localStorage.getItem(KEY) || null
    if (foodById !== null) {
        foodById = JSON.parse(foodById)
    }
    if (id && foodById === null) {
        console.log('Fectching byId from SERVER');
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

async function addNewRecipe(userId, recipe) {
    // console.log(userId)
    // console.log(recipe)
    const newRecipe = await httpService.put('recipe', { userId, recipe })
    if (newRecipe) {
        console.log(newRecipe)
        // storageService.store(USER_DB, newRecipe)
    }
    return newRecipe
}


