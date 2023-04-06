import React, { useState, ChangeEvent } from 'react'
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

export const AddRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')

    // Ingredient
    const [ingredientCount, setIngredientCount] = useState(0)
    const [numberOfIngredients, setNumberOfIngredient] = useState(Array.from(Array(ingredientCount)))
    const [recipeSections, setRecipeSections] = useState(
        [{
            components: [
                {
                    raw_text: null,
                }
            ],
        }]
    )

    function ingredientList(index) {
        if (recipeSections[0].components[0].raw_text === null) return
        return recipeSections[0].components[index].raw_text
    }

    const Ingredients = () => {
        if (ingredientCount) return 'Ingredients:'
    }

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

    function stepList(index) {
        if (recipeInstructions[0].display_text === null) return
        return recipeInstructions[index].display_text
    }

    const steps = () => {
        if (stepCount) return 'Instructions:'
    }

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
            console.log('da');

            const recipeToAdd = {
                name: recipeName,
                country: recipeCountry,
                sections: recipeSections,
                instructions: recipeInstructions,
                thumbnail_url: imgFile,
                original_video_url: videoFile,
            }
            console.log(recipeToAdd.sections)
            setLoading(true)
            dispatch(setAddUserRecipe(loggedInUser, recipeToAdd))
                .then((res) => {
                    if (!res) {
                        console.log('ein rez')
                    }
                    if (res) {
                        console.log(res)
                        dispatch(setUpdatedUser(res))
                        navigate(`/UserProfile/${loggedInUser._id}`)
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
                            numberOfIngredients={numberOfIngredients}
                            setNumberOfIngredient={setNumberOfIngredient}
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
                            setNumberOfStep={setNumberOfStep}
                            numberOfSteps={numberOfSteps}
                        ></AddStep>
                        <AddImage
                            setOutputImg={setOutputImg}
                            setImageFile={setImageFile}
                        ></AddImage>
                        <AddVideo
                            setVideoFile={setVideoFile}
                            setVideoOutput={setVideoOutput}
                        ></AddVideo>
                    </section>
                </form>
                <section className='add-recipe-output'>
                    <h1>Recipe output</h1>
                    <hr />
                    <AddRecipeOutput
                        recipeName={recipeName}
                        recipeCountry={recipeCountry}
                        Ingredients={Ingredients}
                        numberOfIngredients={numberOfIngredients}
                        ingredientList={ingredientList}
                        steps={steps}
                        stepList={stepList}
                        numberOfSteps={numberOfSteps}
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


