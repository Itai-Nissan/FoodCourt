import axios from "axios"

export const foodService = {
    getFood,
    getById,
}

async function getFood(filterBy) {
    const KEY = 'foodDB'
    let foodList = localStorage.getItem(KEY) || {}
    if (foodList.length > 0) {
        foodList = JSON.parse(foodList)
    } 
    if(filterBy) {
        console.log('Fetching from server')
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: { from: '0', size: '20', q: filterBy.text },
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
    console.log('ById');
    let foodById = {}
    if(id) {
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
