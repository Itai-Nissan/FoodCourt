import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/foodActions'
import { setUpdatedUser } from '../store/actions/userActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'
import { AddStep } from '../cmps/addRecipe/AddStep'
import { AddImage } from '../cmps/addRecipe/AddImage'
import { AddVideo } from '../cmps/addRecipe/AddVideo'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'
import { Input, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'
import { ToggleButton } from '@mui/material'
import { ToggleButtonGroup } from '@mui/material'
import { utils } from '.././services/utils'


export const AddRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')

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

    const [togglePreview, setTogglePreview] = useState(true)

    const [alignment, setAlignment] = React.useState('true')

    //validate
    const [incorrectRecipeName, setIncorrectRecipeName] = useState(false)
    const [incorrectRecipeNameText, setIncorrectRecipeNameText] = useState('')
    const [incorrectRecipeCountry, setIncorrectRecipeCountry] = useState(false)
    const [incorrectRecipeCountryText, setIncorrectRecipeCountryText] = useState('')
    const [incorrectRecipeDescription, setIncorrectRecipeDescription] = useState(false)
    const [incorrectRecipeDescriptionText, setIncorrectRecipeDescriptionText] = useState('')
    const [incorrectRecipeIngredient, setIncorrectRecipeIngredient] = useState(false)
    const [incorrectRecipeStep, setIncorrectRecipeStep] = useState(false)

    function validatRecipeName() {
        const validateReturn = utils.validatInput(recipeName, 'recipe name')
        setIncorrectRecipeName(false)
        if (validateReturn !== true) {
            setIncorrectRecipeName(true)
            setIncorrectRecipeNameText(validateReturn)
            return true
        }
    }

    function validatRecipeCountry() {
        const validateReturn = utils.validatInput(recipeCountry, 'recipe origin')
        setIncorrectRecipeCountry(false)
        if (validateReturn !== true) {
            setIncorrectRecipeCountry(true)
            setIncorrectRecipeCountryText(validateReturn)
            return true
        }
    }

    function validatRecipeDescription() {
        const validateReturn = utils.validatInput(recipeDescription, 'recipe description')
        setIncorrectRecipeDescription(false)
        if (validateReturn !== true) {
            setIncorrectRecipeDescription(true)
            setIncorrectRecipeDescriptionText(validateReturn)
            return true
        }
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
        let bool = Boolean
        if (newAlignment === 'true') bool = true
        if (newAlignment === 'false') bool = false
        setTogglePreview(bool)
    }

    function onAddRecipe() {
        if (!loggedInUser) {
            navigate('/login')
            return
        }
        const checkRecipeName = validatRecipeName()
        const checkRecipeCountry = validatRecipeCountry()
        const checkRecipeDescription = validatRecipeDescription()
        if (checkRecipeName === true
            || checkRecipeCountry === true
            || incorrectRecipeIngredient === true
            || incorrectRecipeStep === true
            || checkRecipeDescription === true) return
        else {
            const recipeToAdd = {
                name: recipeName,
                country: recipeCountry,
                description: recipeDescription,
                sections: [
                    {
                        components: recipeSections
                    }
                ],
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
        <div className='add-recipe container'>
            <h1>Add new recipe</h1>
            <hr />
            <div className="content">
                <section className="add-recipe-wrapper">
                    {
                        togglePreview ?
                            <form>
                                <Input type="text" placeholder='Name'
                                    value={recipeName}
                                    onChange={(event) => setRecipeName(event.target.value)} />
                                <p className='incorrect'>{incorrectRecipeName ? incorrectRecipeNameText : ''}</p>
                                <Input type="text" placeholder='Country'
                                    value={recipeCountry}
                                    onChange={(event) => setRecipeCountry(event.target.value)} />
                                <p className='incorrect'>{incorrectRecipeCountry ? incorrectRecipeCountryText : ''}</p>
                                <Input type="text" placeholder='Description'
                                    value={recipeDescription}
                                    onChange={(event) => setRecipeDescription(event.target.value)} />
                                <p className='incorrect'>{incorrectRecipeDescription ? incorrectRecipeDescriptionText : ''}</p>
                                <section className="add-remove-section">
                                    <AddIngredient
                                        ingredientCount={ingredientCount}
                                        setIngredientCount={setIngredientCount}
                                        recipeSections={recipeSections}
                                        setRecipeSections={setRecipeSections}
                                        setIncorrectRecipeIngredient={setIncorrectRecipeIngredient}
                                    ></AddIngredient>
                                    <AddStep
                                        setIncorrectRecipeStep={setIncorrectRecipeStep}
                                        setStepCount={setStepCount}
                                        stepCount={stepCount}
                                        setRecipeInstructions={setRecipeInstructions}
                                        recipeInstructions={recipeInstructions}
                                    ></AddStep>
                                </section>
                            </form>
                            :
                            <section className='add-recipe-output'>
                                <AddRecipeOutput
                                    recipeName={recipeName}
                                    recipeCountry={recipeCountry}
                                    recipeDescription={recipeDescription}
                                    recipeSections={recipeSections}
                                    recipeInstructions={recipeInstructions}
                                    onAddRecipe={onAddRecipe}
                                    imageOutput={outputImg}
                                    videoOutput={videoOutput}
                                    loading={loading}
                                ></AddRecipeOutput>
                            </section>
                    }
                </section>
                <section className="control">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="true">edit</ToggleButton>
                        <ToggleButton value="false">preview</ToggleButton>
                    </ToggleButtonGroup>
                    <section className="buttons">
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
                                <h3 >{loading ? '' : 'Publish recipe'}</h3>
                            </LoadingButton>
                        </div>
                    </section>
                </section>
            </div>
        </div >
    )
}
