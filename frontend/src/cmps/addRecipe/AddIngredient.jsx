import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../../store/actions/foodActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'


export const AddIngredient = (props) => {

    return (
        <div className='add-ingredient'>
                    {props.numberOfIngredients.map((ingredient, index) => {
                        return <div className="add-remove-ingredient" key={index}>
                            <h4>{props.ingredientList(index)}</h4>
                            <Button onClick={event => props.removeIngredient(event, index)} key={index}>Remove ingredient</Button>
                        </div>
                    })
                    }
                    <div className="Add-ingredient">
                        <Input type="text" placeholder={props.recipeIngredient}
                            value={props.recipeIngredient}
                            onChange={(event) => props.setIngredient(event.target.value)} />
                        <Button onClick={props.addIngredient}>Add ingredient</Button>
                    </div>
        </div>
    )
}


