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
            params: { from: '0', size: '20'},
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

function getById(id){
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
        params: {id: '5546'},
        headers: {
          'X-RapidAPI-Key': 'a38ff25a46msh308ca696239e976p1f5e31jsnd96340e8e05f',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
