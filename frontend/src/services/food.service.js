import axios from "axios"
import { httpService } from './http.service.js'

export const foodService = {
    getFood,
    getById,
    addNewRecipe,
}

async function getFood(filterBy) {
    const ENDPOINT = 'recipe'
    const usersRecipes = await httpService.get(ENDPOINT + '/', filterBy)
    return usersRecipes
}

async function getById(id) {
    const ENDPOINT = 'recipe'
    const foodById = await httpService.get(ENDPOINT + '/:id', { id })
    return foodById
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

async function addNewRecipe(user, recipe) {
    console.log(recipe);

    const authUser = await httpService.put('recipe', { user, recipe })
    if (authUser) {
    }
    return authUser
}


