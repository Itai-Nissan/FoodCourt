import axios from "axios"
const KEY = 'foodDB'

export const foodService = {
    getFood
}
// getFood()
async function getFood() {
    let foodList = localStorage.getItem(KEY) || {}
    if (foodList.length > 0) {
        foodList = JSON.parse(foodList)
    } else {
        console.log('Fetching from server')
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: { from: '0', size: '20', tags: 'under_30_minutes' },
            headers: {
                'X-RapidAPI-Key': 'a38ff25a46msh308ca696239e976p1f5e31jsnd96340e8e05f',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        }

        await axios.request(options).then(function (response) {
            foodList = response.data.results
            _save(KEY, foodList)
        }).catch(function (error) {
            console.error(error);
        })
    }
    // console.log('Food service:', foodList)
    return foodList
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
