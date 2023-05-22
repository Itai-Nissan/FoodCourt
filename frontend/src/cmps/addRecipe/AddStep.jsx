import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../../store/actions/foodActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddStep = (props) => {

    // Step
    const [recipeStep, setStep] = useState('')

    function removeStep(e, index) {
        if (props.recipeInstructions.length <= 1) {
            const updatedInstructions = [
                {
                    display_text: null,
                }
            ]

            props.setRecipeInstructions(updatedInstructions)
            props.setStepList(updatedInstructions)
        } else {
            let updatedSections = props.recipeInstructions
            updatedSections.splice(index, 1)
        }
        const newCount = props.stepCount - 1
        props.setStepCount(newCount)
        props.setNumberOfStep(Array.from(Array(newCount)))

    }

    function addStep(e) {
        if (recipeStep === '') return
        if (e.key === "Enter" || e.type === 'click') {
            let updatedInstructions = null
            if (props.recipeInstructions[0].display_text === null) {
                updatedInstructions = props.recipeInstructions
                updatedInstructions[0].display_text = recipeStep
            } else {
                updatedInstructions = props.recipeInstructions
                updatedInstructions.push({
                    display_text: recipeStep,
                })
            }
            props.setRecipeInstructions(updatedInstructions)
            setStep('')

            const newCount = props.stepCount + 1
            props.setStepCount(newCount)
            props.setNumberOfStep(Array.from(Array(newCount)))
        }
    }

    // function stepList(index) {
    //     if (props.recipeInstructions[0].display_text === null) return
    //     return props.recipeInstructions[index].display_text
    // }

    // console.log(props.recipeInstructions);

    return (
        <div className='add-remove-step-section'>
            {props.numberOfSteps.map((step, index) => {
                return <div className="add-remove-step" key={index}>
                    <h4>{props.recipeInstructions[0].display_text === null ? '' : props.recipeInstructions[index].display_text}</h4>
                    <Button onClick={event => removeStep(event, index)} key={index}>Remove step</Button>
                </div>
            })
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


