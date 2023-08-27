import React, { useState, useEffect } from 'react'
import { utils } from '.././services/utils'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateUserRecipe } from '../store/actions/foodActions'
import { setUpdatedUser } from '../store/actions/userActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'
import { AddStep } from '../cmps/addRecipe/AddStep'
import { AddImage } from '../cmps/addRecipe/AddImage'
import { AddVideo } from '../cmps/addRecipe/AddVideo'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'
import { foodService } from '../services/food.service'
import { Input } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { ToggleButton } from '@mui/material'
import { ToggleButtonGroup } from '@mui/material'

export const EditRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const [foodById, setFood] = useState(null | Object)

    async function loadFood() {
        const foodId = params.id
        const fooToSet = await foodService.getById(foodId)
        return fooToSet
    }

    useEffect(() => {
        loadFood()
            .then((foodToSet) => {
                setFood(foodToSet)
                setRecipeName(foodToSet.name)
                setRecipeCountry(foodToSet.country)

                setRecipeSections(foodToSet ? foodToSet.sections[0].components : [])

                setRecipeInstructions(foodToSet ? foodToSet.instructions : [])

                setImageFile(foodToSet ? foodToSet.thumbnail_url : {})
                setOutputImg(foodToSet ? foodToSet.thumbnail_url : {})

                setVideoOutput(foodToSet ? foodToSet.original_video_url : {})
            })
    }, [])

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')

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

    const [togglePreview, setTogglePreview] = useState(true)

    const [alignment, setAlignment] = React.useState('true');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
        let bool = Boolean
        if (newAlignment === 'true') bool = true
        if (newAlignment === 'false') bool = false
        setTogglePreview(bool)
    }

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


    function onEditRecipe() {
        const checkRecipeName = validatRecipeName()
        const checkRecipeCountry = validatRecipeCountry()
        const checkRecipeDescription = validatRecipeDescription()
        if (checkRecipeName === true
            || checkRecipeCountry === true
            || incorrectRecipeIngredient === true
            || incorrectRecipeStep === true
            || checkRecipeDescription === true) return
        else {
            const recipeToUpdate = {
                _id: foodById._id,
                id: foodById.id,
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
            dispatch(setUpdateUserRecipe(loggedInUser, recipeToUpdate))
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
            <section className="content">
                <div className="add-recipe-wrapper">
                    {togglePreview ?
                        <form>
                            <h1>Edit recipe</h1>
                            <hr />
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
                                    setIncorrectRecipeIngredient={setIncorrectRecipeIngredient}
                                    ingredientCount={ingredientCount}
                                    setIngredientCount={setIngredientCount}
                                    recipeSections={recipeSections}
                                    setRecipeSections={setRecipeSections}
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
                                recipeDescription={recipeDescription}
                                recipeName={recipeName}
                                recipeCountry={recipeCountry}
                                recipeSections={recipeSections}
                                recipeInstructions={recipeInstructions}
                                onEditRecipe={onEditRecipe}
                                imageOutput={outputImg}
                                videoOutput={videoOutput}
                                loading={loading}
                            ></AddRecipeOutput>
                        </section>
                    }
                </div>
                <div className="control">
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
                                onClick={onEditRecipe}
                                loading={loading}
                                variant="standard"
                                placeholder='Create'>
                                <h3 >{loading ? '' : 'update recipe'}</h3>
                            </LoadingButton>
                        </div>
                    </section>
                </div>
            </section>

        </div >
    )
}


