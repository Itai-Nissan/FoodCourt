import axios from "axios"
import { httpService } from './http.service.js'

export const foodService = {
    getFood,
    getById,
    addNewRecipe,
    editRecipe,
}

async function getFood(filterBy, startPoint, amountToRturn) {
    const ENDPOINT = 'recipe'
    const pagination = { filterBy, startPoint, amountToRturn }
    const usersRecipes = await httpService.get(ENDPOINT + '/', pagination)
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

    const authUser = await httpService.post('recipe', { user, recipe })
    if (authUser) {
    }
    return authUser
}

async function editRecipe(user, recipe) {

    const authUser = await httpService.put('recipe', { user, recipe })
    if (authUser) {
    }
    return authUser
}


