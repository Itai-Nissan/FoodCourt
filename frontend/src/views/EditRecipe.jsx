import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/foodActions'
import { setUpdatedUser } from '../store/actions/userActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'
import { AddStep } from '../cmps/addRecipe/AddStep'
import { AddImage } from '../cmps/addRecipe/AddImage'
import { AddVideo } from '../cmps/addRecipe/AddVideo'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'
import { foodService } from '../services/food.service'

import { Input } from '@mui/material'
import { LoadingButton } from '@mui/lab'


export const EditRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const [foodById, setFood] = useState(null)

    async function loadFood() {
        const foodId = params.id
        const getFoodById = await foodService.getById(foodId)
        return getFoodById
    }

    useEffect(() => {
        loadFood()
            .then((foodToSet) => {
                // console.log(foodById);
                setFood(foodToSet)
                setRecipeName(foodToSet.name)
                setRecipeCountry(foodToSet.country)

                setRecipeSections(foodToSet ? foodToSet.sections[0].components : [])
                setIngredientCount(foodToSet ? foodToSet.sections[0].components.length : 0)
                setNumberOfIngredients(Array.from(Array(ingredientCount)))
                setIngredientList(foodToSet ? foodToSet.sections[0].components : [])
            })
    }, [])

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')

    // Ingredient
    // const [Ingredients, setIngredients] = useState()
    const [ingredientList, setIngredientList] = useState()
    const [ingredientCount, setIngredientCount] = useState(Number)
    const [numberOfIngredients, setNumberOfIngredients] = useState(Array.from(Array(ingredientCount)))
    const [recipeSections, setRecipeSections] = useState(foodById ? foodById.sections[0].components : [])
    console.log('recipeSections:', recipeSections);

    // const Ingredients = () => {
    //     if (ingredientCount) return 'Ingredients:'
    // }

    // Step
    const [stepCount, setStepCount] = useState(0)
    const [numberOfSteps, setNumberOfStep] = useState(Array.from(Array(stepCount)))
    const [recipeInstructions, setRecipeInstructions] = useState(
        [
            {
                display_text: null,
            }
        ]
    )

    const [stepList, setStepList] = useState(recipeInstructions ? recipeInstructions : null)

    // function stepList(index) {
    //     if (recipeInstructions[0].display_text === null) return
    //     return recipeInstructions[index].display_text
    // }

    const steps = () => {
        if (stepCount) return 'Instructions:'
    }

    //image
    const [imgFile, setImageFile] = useState(foodById ? foodById.thumbnail_url : {})
    const [outputImg, setOutputImg] = useState(foodById ? foodById.thumbnail_url : {})

    //video
    const [videoFile, setVideoFile] = useState('')
    const [videoOutput, setVideoOutput] = useState('')

    //add recipe
    const [loading, setLoading] = useState(false)

    function onAddRecipe() {
        if (recipeName === '') {
            console.log('neit')
            return
        }
        else {
            const recipeToAdd = {
                name: recipeName,
                country: recipeCountry,
                sections: recipeSections,
                instructions: recipeInstructions,
                thumbnail_url: imgFile,
                original_video_url: videoFile,
            }
            setLoading(true)
            dispatch(setAddUserRecipe(loggedInUser, recipeToAdd))
                .then((res) => {
                    if (!res) {
                        console.log('ein rez')
                    }
                    if (res) {
                        console.log(res)
                        dispatch(setUpdatedUser(res))
                            .then(() => {
                                navigate(`/UserProfile/${loggedInUser._id}`)
                            })
                    }
                })
        }
    }

    return (
        <div className='add-recipe'>
            <div className="add-recipe-wrapper">
                <form>
                    <h1>Add new recipe</h1>
                    <hr />
                    <Input type="text" placeholder='Name'
                        value={recipeName}
                        onChange={(event) => setRecipeName(event.target.value)} />
                    <Input type="text" placeholder='Country'
                        value={recipeCountry}
                        onChange={(event) => setRecipeCountry(event.target.value)} />
                    <section className="add-remove-section">
                        <AddIngredient
                            numberOfIngredients={numberOfIngredients > 0 ? numberOfIngredients : []}
                            setNumberOfIngredient={setNumberOfIngredients}
                            ingredientCount={ingredientCount}
                            setIngredientCount={setIngredientCount}
                            recipeSections={recipeSections.length > 0 ? recipeSections : []}
                            setRecipeSections={setRecipeSections}
                            ingredientList={ingredientList ? ingredientList : []}
                            setIngredientList={setIngredientList}
                        ></AddIngredient>
                        {/* <AddStep
                            setStepCount={setStepCount}
                            stepCount={stepCount}
                            setRecipeInstructions={setRecipeInstructions}
                            recipeInstructions={recipeInstructions}
                            setNumberOfStep={setNumberOfStep}
                            numberOfSteps={numberOfSteps}
                        ></AddStep> */}
                        <div className="upload-button">
                            <AddImage
                                setOutputImg={setOutputImg}
                                setImageFile={setImageFile}
                            ></AddImage>
                            {/* <AddVideo
                                setVideoFile={setVideoFile}
                                setVideoOutput={setVideoOutput}
                            ></AddVideo> */}
                        </div>
                        <div className='loading-button'>
                            <LoadingButton
                                onClick={onAddRecipe}
                                loading={loading}
                                variant="standard"
                                placeholder='Create'>
                                <h3 >{loading ? '' : 'Create recipe'}</h3>
                            </LoadingButton>
                        </div>
                    </section>
                </form>
                <section className='add-recipe-output'>
                    <h1>Recipe output</h1>
                    <hr />
                    <AddRecipeOutput
                        recipeName={recipeName ? foodById.name : ''}
                        recipeCountry={recipeCountry ? foodById.country : ''}
                        // Ingredients={Ingredients}
                        numberOfIngredients={numberOfIngredients}
                        ingredientList={ingredientList}
                        // steps={steps}
                        // stepList={stepList}
                        // numberOfSteps={numberOfSteps}
                        // onAddRecipe={onAddRecipe}
                        imageOutput={foodById ? foodById.thumbnail_url : {}}
                    // videoOutput={videoOutput}
                    // loading={loading}
                    ></AddRecipeOutput>
                </section>
            </div>
        </div >
    )
}


