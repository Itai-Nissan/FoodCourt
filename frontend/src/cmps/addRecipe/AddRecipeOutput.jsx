import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

export const AddRecipeOutput = (props) => {

    return (
        <div className='recipe-output'>
            {/* <img className='details-bg' src={foodById.thumbnail_url} alt="" /> */}
            <section className='details-left'>
                <h1>Name: {props.recipeName}</h1>
                <h3>Country: {props.recipeCountry}</h3>
                <h4 >{props.Ingredients()}</h4>
                {props.numberOfIngredients.map((ingredient, index) => {
                    return <div className="add-remove-ingredient" key={index}>
                        <p>{props.ingredientList(index)}</p>
                    </div>
                })
                }
                <h4 >{props.steps()}</h4>
                {props.numberOfSteps.map((ingredient, index) => {
                    return <div className="add-remove-ingredient" key={index}>
                        <p>{props.stepList(index)}</p>
                    </div>
                })
                }
            </section>
            <Button onClick={props.onAddRecipe}>Create recipe</Button>
        </div>
    )
}


