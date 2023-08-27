import React, { useState, useEffect } from 'react'
import { utils } from '../../services/utils'


export const AddRecipeOutput = (props) => {
    const [updatedSection, setUpdateSection] = useState(props.recipeSections)

    return (
        <div className="recipe-output">
            <div className='recipe-output'>
                <div className="food-details">
                    <section className='details-left' >
                        <h1>{props.recipeName ? utils.firstToCap(props.recipeName) : 'Recipe name'}</h1>
                        <h2>Recipe origin - {props.recipeCountry ? utils.firstToCap(props.recipeCountry) : ''}</h2>
                        <p >{props.recipeDescription && props.recipeDescription.length !== 0 ? props.recipeDescription : ''}</p>
                        <h3 >{props.recipeSections && props.recipeSections.length !== 0 ? 'Ingredients' : ''}</h3>
                        {props.recipeSections && props.recipeSections.length !== 0 ? <hr /> : null}
                        {props.recipeSections ? props.recipeSections.map((ingredient, index) => {
                            return <div className="add-remove-ingredient" key={index}>
                                <p>{utils.firstToCap(props.recipeSections[index].raw_text)}</p>
                            </div>
                        }) : ''
                        }
                        <h3 >{props.recipeInstructions && props.recipeInstructions.length !== 0 ? 'Instructions' : ''}</h3>
                        {props.recipeInstructions && props.recipeInstructions.length !== 0 ? <hr /> : null}
                        {props.recipeInstructions ? props.recipeInstructions.map((ingredient, index) => {
                            return <div className="add-remove-step" key={index}>
                                <h4>Step {index + 1}</h4>
                                <p>{utils.firstToCap(props.recipeInstructions[index].display_text)}</p>
                            </div>
                        }) : ''
                        }
                    </section>
                    <section className='details-right'>
                        <div className="sticky-right">
                            <div className="food-video">
                                <img className='' src={props.imageOutput} alt="" />
                                {props.videoOutput ? <video controls autoPlay muted
                                    src={props.videoOutput}></video> : null}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}


