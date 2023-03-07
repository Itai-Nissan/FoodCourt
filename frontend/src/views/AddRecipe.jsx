import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/foodActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'
import { AddStep } from '../cmps/addRecipe/AddStep'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddRecipe = () => {
    const dispatch = useDispatch()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')

    // Ingredient
    const [ingredientCount, setIngredientCount] = useState(0)
    const [numberOfIngredients, setNumberOfIngredient] = useState(Array.from(Array(ingredientCount)))
    const [recipeIngredient, setIngredient] = useState('')
    const [recipeSections, setRecipeSections] = useState([{
        components: [
            {
                raw_text: null,
            }
        ],
    }
    ])

    function removeIngredient(e, index) {
        if (recipeSections[0].components.length === 1) {
            recipeSections[0].components[0].raw_text = null
        } else {
            let updatedSections = recipeSections
            updatedSections[0].components.splice(index, 1)

        }
        const newCount = ingredientCount - 1
        setIngredientCount(newCount)
        setNumberOfIngredient(Array.from(Array(newCount)))

    }

    function addIngredient(e) {
        if (recipeIngredient === '') return
        if (e.key === "Enter" || e.type === 'click') {
            let updatedSections = null
            if (recipeSections[0].components[0].raw_text === null) {
                updatedSections = recipeSections
                updatedSections[0].components[0].raw_text = recipeIngredient
            } else {
                updatedSections = recipeSections
                updatedSections[0].components.push({
                    raw_text: recipeIngredient,
                })
            }
            setRecipeSections(updatedSections)
            setIngredient('')

            const newCount = ingredientCount + 1
            setIngredientCount(newCount)
            setNumberOfIngredient(Array.from(Array(newCount)))
        }
    }

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
    const [recipeStep, setStep] = useState('')
    const [recipeInstructions, setRecipeInstructions] = useState(
        [
            {
                display_text: null,
            }
        ]
    )

    function removeStep(e, index) {
        if (recipeInstructions.length === 1) {
            recipeInstructions = null
        } else {
            let updatedSections = recipeInstructions
            updatedSections.splice(index, 1)
        }
        const newCount = stepCount - 1
        setStepCount(newCount)
        setNumberOfStep(Array.from(Array(newCount)))

    }

    function addStep(e) {
        if (recipeStep === '') return
        if (e.key === "Enter" || e.type === 'click') {
            let updatedInstructions = null
            if (recipeInstructions[0].display_text === null) {
                updatedInstructions = recipeInstructions
                updatedInstructions[0].display_text = recipeStep
            } else {
                updatedInstructions = recipeInstructions
                updatedInstructions.push({
                    display_text: recipeStep,
                })
            }
            setRecipeInstructions(updatedInstructions)
            setStep('')

            const newCount = stepCount + 1
            setStepCount(newCount)
            setNumberOfStep(Array.from(Array(newCount)))
        }
    }

    function stepList(index) {
        if (recipeInstructions[0].display_text === null) return
        return recipeInstructions[index].display_text
    }

    const steps = () => {
        if (stepCount) return 'Instructions:'

    }

    function onAddRecipe() {
        const recipeToAdd = {
            name: recipeName,
            country: recipeCountry,
            section: recipeSections,
            instructions: recipeInstructions,
        }

        return dispatch(setAddUserRecipe(loggedInUser._id, recipeToAdd))
            .then((res) => {
                if (!res) {
                    console.log('ein rez')
                }
                if (res) {
                    // routeToProfile(res)
                }
                setRecipeName('')
                setRecipeCountry('')
            })
    }

    return (
        <div className='add-recipe'>
            <h2>Add new recipe</h2>
            <div className="add-recipe-wrapper">
                <form>
                    <Input type="text" placeholder='Name'
                        value={recipeName}
                        onChange={(event) => setRecipeName(event.target.value)} />
                    <Input type="text" placeholder='Country'
                        value={recipeCountry}
                        onChange={(event) => setRecipeCountry(event.target.value)} />
                    <section className="add-remove-section">
                        <AddIngredient
                            ingredientList={ingredientList}
                            addIngredient={addIngredient}
                            removeIngredient={removeIngredient}
                            setIngredient={setIngredient}
                            recipeIngredient={recipeIngredient}
                            numberOfIngredients={numberOfIngredients}
                        ></AddIngredient>
                        <AddStep
                            stepList={stepList}
                            addStep={addStep}
                            removeStep={removeStep}
                            setStep={setStep}
                            recipeStep={recipeStep}
                            numberOfSteps={numberOfSteps}
                        ></AddStep>
                    </section>
                </form>
                <section className='add-recipe-output'>
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
                    ></AddRecipeOutput>
                </section>
            </div>
        </div>
    )
}


