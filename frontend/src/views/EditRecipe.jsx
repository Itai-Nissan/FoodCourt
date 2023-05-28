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
                console.log(foodToSet);
                setFood(foodToSet)
                setRecipeName(foodToSet.name)
                setRecipeCountry(foodToSet.country)

                setRecipeSections(foodToSet ? foodToSet.sections[0].components : [])
                // setIngredientCount(foodToSet ? foodToSet.sections[0].components.length : 0)

                setRecipeInstructions(foodToSet ? foodToSet.instructions : [])

                setOutputImg(foodToSet ? foodToSet.thumbnail_url : {})
                // setStepCount(foodToSet ? foodToSet.instructions.length : 0)
            })
    }, [])

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')

    // Ingredient
    const [recipeSections, setRecipeSections] = useState(foodById ? foodById.sections[0].components : [])
    const [ingredientCount, setIngredientCount] = useState(foodById ? foodById.sections[0].components.length : 0)

    // Step
    const [recipeInstructions, setRecipeInstructions] = useState([])
    const [stepCount, setStepCount] = useState(recipeInstructions ? recipeInstructions.length : 0)

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
                    <h1>Edit recipe</h1>
                    <hr />
                    <Input type="text" placeholder='Name'
                        value={recipeName}
                        onChange={(event) => setRecipeName(event.target.value)} />
                    <Input type="text" placeholder='Country'
                        value={recipeCountry}
                        onChange={(event) => setRecipeCountry(event.target.value)} />
                    <section className="add-remove-section">
                        <AddIngredient
                            ingredientCount={ingredientCount}
                            setIngredientCount={setIngredientCount}
                            recipeSections={recipeSections}
                            setRecipeSections={setRecipeSections}
                        ></AddIngredient>
                        <AddStep
                            setStepCount={setStepCount}
                            stepCount={stepCount}
                            setRecipeInstructions={setRecipeInstructions}
                            recipeInstructions={recipeInstructions}
                        ></AddStep>
                        <div className="upload-button">
                            <AddImage
                                setOutputImg={setOutputImg}
                                setImageFile={setImageFile}
                            ></AddImage>
                            <AddVideo
                                setVideoFile={setVideoFile}
                                setVideoOutput={setVideoOutput}
                            ></AddVideo>
                        </div>
                        <div className='loading-button'>
                            <LoadingButton
                                onClick={onAddRecipe}
                                loading={loading}
                                variant="standard"
                                placeholder='Create'>
                                <h3 >{loading ? '' : 'Save recipe'}</h3>
                            </LoadingButton>
                        </div>
                    </section>
                </form>
                <section className='add-recipe-output'>
                    <h1>Recipe output</h1>
                    <hr />
                    <AddRecipeOutput
                        recipeName={recipeName}
                        recipeCountry={recipeCountry}
                        recipeSections={recipeSections}
                        recipeInstructions={recipeInstructions}
                        onAddRecipe={onAddRecipe}
                        imageOutput={outputImg}
                        videoOutput={videoOutput}
                        loading={loading}
                    ></AddRecipeOutput>
                </section>
            </div>
        </div >
    )
}


