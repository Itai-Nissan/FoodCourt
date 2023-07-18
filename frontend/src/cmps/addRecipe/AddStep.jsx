import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../../store/actions/foodActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddStep = (props) => {

    // Step
    const [recipeStep, setStep] = useState('')
    const [updatedRecipeStep, setUpdatedStep] = useState('')


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
        if (recipeStep === '') return
        if (e.key === "Enter" || e.type === 'click') {
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
        props.setRecipeInstructions(updatedInstructions)

        const newCount = props.stepCount + 1
        props.setStepCount(newCount)
    }

    return (
        <div className='add-remove-step-section'>
            {props.recipeInstructions ? props.recipeInstructions.map((step, index) => {
                return <div className="add-remove-step" key={index}>
                    <Input type="text" placeholder={step.display_text}
                        value={step.display_text}
                        onChange={event => { setUpdatedStep(event.target.value); updateStep(event, index) }}
                    />

                    {/* <h4>{props.recipeInstructions[0].display_text === null ? '' : props.recipeInstructions[index].display_text}</h4> */}
                    <Button onClick={event => removeStep(event, index)} key={index}>Remove step</Button>
                </div>
            }) : []
            }
            <div className="add-step">
                <Input type="text" placeholder={recipeStep}
                    value={recipeStep}
                    onChange={(event) => setStep(event.target.value)}
                    onKeyDown={addStep} />
                <Button onClick={addStep}>Add step</Button>
            </div>
        </div>
    )
}


