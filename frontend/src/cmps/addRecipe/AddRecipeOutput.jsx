import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

export const AddRecipeOutput = (props) => {

    return (
        <div className='recipe-output'>
            <img className='recipe-details-bg' src={props.imageOutput ? props.imageOutput : null} alt="" />
            <div className="food-details">
                <section className='details-left'>
                    <h2>{props.recipeName ? props.recipeName : 'Recipe name'}</h2>
                    <h2>{props.recipeCountry ? props.recipeCountry : 'Recipe origin'}</h2>
                    <h3 >{props.Ingredients()}</h3>
                    {props.Ingredients() ? <hr /> : null}
                    {props.numberOfIngredients.map((ingredient, index) => {
                        return <div className="add-remove-ingredient" key={index}>
                            <p>{props.ingredientList(index)}</p>
                        </div>
                    })
                    }
                    <h3 >{props.steps()}</h3>
                    {props.steps() ? <hr /> : null}
                    {props.numberOfSteps.map((ingredient, index) => {
                        return <div className="add-remove-step" key={index}>
                            <h4>Step {index + 1}</h4>
                            <p>{props.stepList(index)}</p>
                        </div>
                    })
                    }
                    <section className='details-right'>
                        <div className="sticky-right">
                            <div className="food-video">
                                {props.videoOutput ? <video controls autoPlay muted
                                    src={props.videoOutput}></video> : null}
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <Button onClick={props.onAddRecipe}>Create recipe</Button>
        </div>
    )
}


