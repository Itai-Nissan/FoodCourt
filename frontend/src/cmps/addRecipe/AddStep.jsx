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
        props.setIncorrectRecipeStep(false)
        if (e.key === "Enter" || e.type === 'click') {
            const checkRecipeStep = validatRecipeStep(recipeStep)
            if (checkRecipeStep === false) {
                props.setIncorrectRecipeStep(true)
                return
            }

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
        props.setIncorrectRecipeStep(false)
        let updatedInstructions = props.recipeInstructions
        updatedInstructions.splice(index, 1, { display_text: event.target.value })
        const checkRecipeStep = validatRecipeStep(event.target.value)
        if (checkRecipeStep === false) {
            props.setIncorrectRecipeStep(true)
            return
        }
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
                    <Button className='remove-button' onClick={event => removeStep(event, index)} key={index}>
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"></path>
                        </svg>
                    </Button>
                    <Input type="text" placeholder={step.display_text}
                        value={step.display_text}
                        onChange={event => { setUpdatedStep(event.target.value); updateStep(event, index) }}
                    />
                </div>
            }) : []
            }
            <div className="add-step">
                <Button className='add-button' onClick={addStep}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                        <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
                    </svg>
                </Button>
                <Input type="text" placeholder={recipeStep ? recipeStep : 'Add step'}
                    value={recipeStep}
                    onChange={(event) => setStep(event.target.value)}
                    onKeyDown={addStep} />
            </div>
        </div>
    )
}


