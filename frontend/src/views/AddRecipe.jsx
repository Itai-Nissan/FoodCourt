import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/foodActions'
import { setUpdatedUser } from '../store/actions/userActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'
import { AddStep } from '../cmps/addRecipe/AddStep'
import { AddImage } from '../cmps/addRecipe/AddImage'
import { AddVideo } from '../cmps/addRecipe/AddVideo'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'
import { Input } from '@mui/material'
import { LoadingButton } from '@mui/lab';


export const AddRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')

    // Ingredient
    const [recipeSections, setRecipeSections] = useState([])
    const [ingredientCount, setIngredientCount] = useState(recipeSections ? recipeSections.length : 0)

    // Step
    const [recipeInstructions, setRecipeInstructions] = useState([])
    const [stepCount, setStepCount] = useState(recipeInstructions ? recipeInstructions.length : 0)

    //image
    const [imgFile, setImageFile] = useState()
    const [outputImg, setOutputImg] = useState()

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
                sections: [
                    {
                        components: recipeSections
                    }
                ],
                instructions: recipeInstructions,
                thumbnail_url: imgFile,
                original_video_url: videoFile,
            }
            // setLoading(true)
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
        <div className='add-recipe container'>
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
                                <h3 >{loading ? '' : 'Create recipe'}</h3>
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
