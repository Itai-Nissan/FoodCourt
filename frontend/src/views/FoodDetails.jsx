import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { foodService } from '../services/food.service'
import { addToFav } from '../store/actions/userActions'
import { removeFromFav } from '../store/actions/userActions'
import { Button } from '@mui/material'
import { RecipeSkeleton } from '../cmps/RecipeSkeleton'
import { SingleRecipe } from '../cmps/recipeDetails/SingleRecipe'
import { MultiRecipe } from '../cmps/recipeDetails/MultiRecipe'

export const FoodDetails = (props) => {
    window.scrollTo(0, 0)
    const params = useParams()
    const dispatch = useDispatch()

    const [foodById, setFood] = useState(null)
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const isFav = (() => {
        let ans = false
        loggedInUser.userFavorite.map((recipe) => {
            if (recipe.id === foodById.id) {
                ans = true
                return
            }
        })
        return ans
    })

    useEffect(() => {
        loadFood()
    }, [params.id])

    async function loadFood() {
        const foodId = params.id
        const getFoodById = await foodService.getById(foodId)
        setFood(getFoodById)
    }

    async function addFoodToFav() {
        if (!loggedInUser) return
        return dispatch(addToFav(loggedInUser, foodById))
    }

    async function removeRecipeFromFav() {
        if (!loggedInUser) return
        return dispatch(removeFromFav(loggedInUser, foodById.id))
    }

    if (!foodById) return <div>
        <RecipeSkeleton></RecipeSkeleton>
    </div>

    return (
        <div className=''>
            {foodById.recipes ?
                foodById.recipes.map((recipe, index) => {
                    return <MultiRecipe
                        index={index}
                        foodById={foodById}
                        recipe={recipe}
                        loggedInUser={loggedInUser}
                        addFoodToFav={addFoodToFav}
                        isFav={isFav}
                        key={index}></MultiRecipe>
                })
                :
                <SingleRecipe
                    foodById={foodById}
                    loggedInUser={loggedInUser}
                    addFoodToFav={addFoodToFav}
                    removeRecipeFromFav={removeRecipeFromFav}
                // isFav={isFav}
                ></SingleRecipe>
            }
            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div>
    )
}