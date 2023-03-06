import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/foodActions'
import { AddIngredient } from '../cmps/addRecipe/AddIngredient'

import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { AddRecipeOutput } from '../cmps/addRecipe/AddRecipeOutput'


export const AddRecipe = () => {
    const dispatch = useDispatch()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const [ingredientCount, setIngredientCount] = useState(0)
    const [numberOfIngredients, setNumberOfIngredient] = useState(Array.from(Array(ingredientCount)))
    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')
    const [recipeIngredient, setIngredient] = useState('')
    const [recipeSections, setRecipeSections] = useState([{
        components: [
            {
                raw_text: null,
            }
        ],
    }
    ])

    function onAddRecipe() {
        const recipeToAdd = {
            name: recipeName,
            country: recipeCountry,
            section: recipeSections,
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

    function addIngredient() {
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

    function ingredientList(index) {
        if (recipeSections[0].components[0].raw_text === null) return
        return recipeSections[0].components[index].raw_text
    }

    const Ingredients = () => {
        if (ingredientCount) return 'Ingredients:'

    }

    return (
        <div className='add-recipe'>
            <h2>Add new recipe</h2>
            <div className="add-recipe-wrapper">

                <form action="">
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
                    </section>
                    {/* <Button onClick={onAddRecipe}>Create recipe</Button> */}
                </form>
                <section className='add-recipe-output'>
                    <AddRecipeOutput
                        recipeName={recipeName}
                        recipeCountry={recipeCountry}
                        Ingredients={Ingredients}
                        numberOfIngredients={numberOfIngredients}
                        ingredientList={ingredientList}
                        onAddRecipe={onAddRecipe}
                    ></AddRecipeOutput>
                </section>
            </div>
        </div>
    )
}


