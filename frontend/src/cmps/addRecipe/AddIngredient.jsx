import React, { useState, useEffect } from 'react'
import { utils } from '../../services/utils'
import { Input } from '@mui/material'
import { Button } from '@mui/material'

export const AddIngredient = (props) => {

    const [recipeIngredient, setIngredient] = useState('')
    const [updatedRecipeIngredient, setUpdatedIngredient] = useState('')

    const [incorrectRecipeIngredient, setIncorrectRecipeIngredient] = useState(false)
    const [incorrectRecipeIngredientText, setIncorrectRecipeIngredientText] = useState('')

    function validatRecipeIngredient(value) {
        const validateReturn = utils.validatInput(value, 'ingredient')
        setIncorrectRecipeIngredient(false)
        if (validateReturn !== true) {
            setIncorrectRecipeIngredient(true)
            setIncorrectRecipeIngredientText(validateReturn)
            return false
        }
    }

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
        props.setIncorrectRecipeIngredient(false)
        if (e.key === "Enter" || e.type === 'click') {
            const checkRecipeIngredient = validatRecipeIngredient(recipeIngredient)
            if (checkRecipeIngredient === false) {
                props.setIncorrectRecipeIngredient(true)
                return
            }
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
        props.setIncorrectRecipeIngredient(false)

        let updatedSections = props.recipeSections
        updatedSections.splice(index, 1, { raw_text: event.target.value })
        const checkRecipeIngredient = validatRecipeIngredient(event.target.value)
        if (checkRecipeIngredient === false) {
            props.setIncorrectRecipeIngredient(true)
            return
        }
        props.setRecipeSections(updatedSections)

        const newCount = props.ingredientCount + 1
        props.setIngredientCount(newCount)
    }

    return (
        <div className='add-remove-ingredient-section'>
            <h3>Ingredients</h3>
            <hr />
            <p className='incorrect'>{incorrectRecipeIngredient ? incorrectRecipeIngredientText : ''}</p>
            {props.recipeSections ? props.recipeSections.map((ingredient, index) => {
                return <div className="add-remove-ingredient" key={index}>
                    <Button onClick={event => removeIngredient(event, index)} key={index}>-</Button>
                    <Input type="text" placeholder={ingredient.raw_text}
                        value={ingredient.raw_text}
                        onChange={event => { setUpdatedIngredient(event.target.value); updateIngredient(event, index) }} />
                </div>
            }) : []
            }
            <div className="add-ingredient">
                <Button onClick={event => addIngredient(event)}>+</Button>
                <Input type="text" placeholder={recipeIngredient ? recipeIngredient : 'Add ingredient'}
                    value={recipeIngredient}
                    onChange={(event) => setIngredient(event.target.value)}
                    onKeyDown={event => addIngredient(event)}
                />
            </div>
        </div>
    )
}
