import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../../store/actions/foodActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddIngredient = (props) => {

    // Ingredient
    const [recipeIngredient, setIngredient] = useState('')

    function removeIngredient(e, index) {
        if (props.recipeSections[0].components.length === 1) {
            props.recipeSections[0].components[0].raw_text = null
            props.setRecipeSections(
                [{
                    components: [
                        {
                            raw_text: null,
                        }
                    ],
                }]
            )


        } else {
            let updatedSections = props.recipeSections
            updatedSections[0].components.splice(index, 1)

        }
        const newCount = props.ingredientCount - 1
        props.setIngredientCount(newCount)
        props.setNumberOfIngredient(Array.from(Array(newCount)))

    }

    function addIngredient(e) {
        if (recipeIngredient === '') return
        if (e.key === "Enter" || e.type === 'click') {
            let updatedSections = null
            if (props.recipeSections[0].components[0].raw_text === null) {
                updatedSections = props.recipeSections
                updatedSections[0].components[0].raw_text = recipeIngredient
            } else {
                updatedSections = props.recipeSections
                updatedSections[0].components.push({
                    raw_text: recipeIngredient,
                })
            }
            props.setRecipeSections(updatedSections)
            setIngredient('')

            const newCount = props.ingredientCount + 1
            props.setIngredientCount(newCount)
            props.setNumberOfIngredient(Array.from(Array(newCount)))
        }
    }

    function ingredientList(index) {
        if (props.recipeSections[0].components[0].raw_text === null) return
        return props.recipeSections[0].components[index].raw_text
    }

    const Ingredients = () => {
        if (props.ingredientCount) return 'Ingredients:'

    }
    return (
        <div className='add-remove-ingredient-section'>
            {props.numberOfIngredients.map((ingredient, index) => {
                return <div className="add-remove-ingredient" key={index}>
                    <h4>{ingredientList(index)}</h4>
                    <Button onClick={event => removeIngredient(event, index)} key={index}>Remove ingredient</Button>
                </div>
            })
            }
            <div className="add-ingredient">
                <Input type="text" placeholder={recipeIngredient}
                    value={recipeIngredient}
                    onChange={(event) => setIngredient(event.target.value)}
                    onKeyDown={addIngredient} />
                <Button onClick={addIngredient}>Add ingredient</Button>
            </div>
        </div>
    )
}


