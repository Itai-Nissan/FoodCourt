import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../../store/actions/foodActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddStep = (props) => {

    return (
        <div className='add-remove-step-section'>
            {props.numberOfSteps.map((step, index) => {
                return <div className="add-remove-step" key={index}>
                    <h4>{props.stepList(index)}</h4>
                    <Button onClick={event => props.removeStep(event, index)} key={index}>Remove step</Button>
                </div>
            })
            }
            <div className="add-step">
                <Input type="text" placeholder={props.recipeStep}
                    value={props.recipeStep}
                    onChange={(event) => props.setStep(event.target.value)}
                    onKeyDown={props.addStep} />
                <Button onClick={props.addStep}>Add step</Button>
            </div>
        </div>
    )
}


