import React, { useState } from 'react'
import { utils } from '../../services/utils'
import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddStep = (props) => {

    // Step
    const [recipeStep, setStep] = useState('')
    const [updatedRecipeStep, setUpdatedStep] = useState('')

    const [incorrectRecipeStep, setIncorrectRecipeStep] = useState(false)
    const [incorrectRecipeStepText, setIncorrectRecipeStepText] = useState('')

    function validatRecipeStep(value) {
        console.log(value);
        const validateReturn = utils.validatInput(value, 'Step')
        setIncorrectRecipeStep(false)
        if (validateReturn !== true) {
            setIncorrectRecipeStep(true)
            setIncorrectRecipeStepText(validateReturn)
            return false
        }
    }

    function removeStep(e, index) {
        if (props.recipeInstructions.length === 1) {
            props.recipeInstructions.splice(index, 1)
        } else {
            let updatedSections = props.recipeInstructions
            updatedSections.splice(index, 1)
        }

        const newCount = props.stepCount - 1
        props.setStepCount(newCount)
    }

    function addStep(e) {
        if (e.key === "Enter" || e.type === 'click') {
            const checkRecipeStep = validatRecipeStep(recipeStep)
            if (checkRecipeStep === false) return

            let updatedInstructions = null
            if (props.recipeInstructions.length === 0) {
                updatedInstructions = props.recipeInstructions
                updatedInstructions.push({ display_text: recipeStep })
            } else {
                updatedInstructions = props.recipeInstructions
                updatedInstructions.push({
                    display_text: recipeStep,
                })
            }
            props.setRecipeInstructions(updatedInstructions)
            console.log(updatedInstructions);
            setStep('')

            const newCount = props.stepCount + 1
            props.setStepCount(newCount)
        }
    }

    function updateStep(event, index) {
        let updatedInstructions = props.recipeInstructions
        updatedInstructions.splice(index, 1, { display_text: event.target.value })
        const checkRecipeStep = validatRecipeStep(event.target.value)
        if (checkRecipeStep === false) return
        props.setRecipeInstructions(updatedInstructions)

        const newCount = props.stepCount + 1
        props.setStepCount(newCount)
    }

    return (
        <div className='add-remove-step-section'>
            <h3>Steps</h3>
            <hr />
            <p className='incorrect'>{incorrectRecipeStep ? incorrectRecipeStepText : ''}</p>
            {props.recipeInstructions ? props.recipeInstructions.map((step, index) => {
                return <div className="add-remove-step" key={index}>
                    <Button onClick={event => removeStep(event, index)} key={index}>-</Button>
                    <Input type="text" placeholder={step.display_text}
                        value={step.display_text}
                        onChange={event => { setUpdatedStep(event.target.value); updateStep(event, index) }}
                    />
                </div>
            }) : []
            }
            <div className="add-step">
                <Button onClick={addStep}>+</Button>
                <Input type="text" placeholder={recipeStep ? recipeStep : 'Add step'}
                    value={recipeStep}
                    onChange={(event) => setStep(event.target.value)}
                    onKeyDown={addStep} />
            </div>
        </div>
    )
}


