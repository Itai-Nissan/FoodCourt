import React, { useState, useEffect } from 'react'
import { utils } from '../../services/utils'
import { Plus } from '../icons/Plus'
import { Input } from '@mui/material'
import { Button } from '@mui/material'
// import AdbIcon from '@mui/icons-material/Adb'
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';



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
                    <Button className='remove-button' onClick={event => removeIngredient(event, index)} key={index}>
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"></path>
                        </svg>
                    </Button>
                    <Input type="text" placeholder={ingredient.raw_text}
                        value={ingredient.raw_text}
                        onChange={event => { setUpdatedIngredient(event.target.value); updateIngredient(event, index) }} />
                </div>
            }) : []
            }
            <div className="add-ingredient">
                <Button className='add-button' onClick={event => addIngredient(event)}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                        <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
                    </svg>
                </Button>
                <Input type="text" placeholder={recipeIngredient ? recipeIngredient : 'Add ingredient'}
                    value={recipeIngredient}
                    onChange={(event) => setIngredient(event.target.value)}
                    onKeyDown={event => addIngredient(event)}
                />
            </div>
        </div>
    )
}
