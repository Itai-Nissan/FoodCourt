import React, { useState, useEffect } from 'react'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddIngredient = (props) => {

    const [recipeIngredient, setIngredient] = useState('')
    const [updatedRecipeIngredient, setUpdatedIngredient] = useState('')

    function removeIngredient(e, index) {
        if (props.recipeSections.length === 1) {
            props.recipeSections.splice(index, 1)
        } else {
            let updatedSections = props.recipeSections
            updatedSections.splice(index, 1)
        }
        const newCount = props.ingredientCount - 1
        props.setIngredientCount(newCount)
    }

    function addIngredient(e) {
        if (recipeIngredient === '') return
        if (e.key === "Enter" || e.type === 'click') {
            let updatedSections = null
            if (props.recipeSections.length === 0) {
                updatedSections = props.recipeSections
                updatedSections.push({ raw_text: recipeIngredient })
            } else {
                updatedSections = props.recipeSections
                updatedSections.push({
                    raw_text: recipeIngredient,
                })
            }
            props.setRecipeSections(updatedSections)
            setIngredient('')

            const newCount = props.ingredientCount + 1
            props.setIngredientCount(newCount)
        }
    }

    function updateIngredient(event, index) {
        let updatedSections = props.recipeSections
        updatedSections.splice(index, 1, { raw_text: event.target.value })
        props.setRecipeSections(updatedSections)

        const newCount = props.ingredientCount + 1
        props.setIngredientCount(newCount)
    }

    return (
        <div className='add-remove-ingredient-section'>
            {props.recipeSections ? props.recipeSections.map((ingredient, index) => {
                return <div className="add-remove-ingredient" key={index}>
                    <Input type="text" placeholder={ingredient.raw_text}
                        value={ingredient.raw_text}
                        onChange={event => { setUpdatedIngredient(event.target.value); updateIngredient(event, index) }}
                    />
                    <Button onClick={event => removeIngredient(event, index)} key={index}>Remove ingredient</Button>
                </div>
            }) : []
            }
            <div className="add-ingredient">
                <Input type="text" placeholder={recipeIngredient}
                    value={recipeIngredient}
                    onChange={(event) => setIngredient(event.target.value)}
                    onKeyDown={addIngredient}
                />
                <Button onClick={addIngredient}>Add ingredient</Button>
            </div>
        </div>
    )
}
