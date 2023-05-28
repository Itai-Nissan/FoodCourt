import React, { useState, useEffect } from 'react'
import { utils } from '../../services/utils'


export const AddRecipeOutput = (props) => {
    const [updatedSection, setUpdateSection] = useState(props.recipeSections)
    
    return (
        <div className="recipe-output">
            <div className='recipe-output'>
                <img className='recipe-details-bg' src={props.imageOutput} alt="" />
                <div className="food-details">
                    <section className='details-left' >
                        <h2>{props.recipeName ? utils.firstToCap(props.recipeName) : 'Recipe name'}</h2>
                        <h2>{props.recipeCountry ? utils.firstToCap(props.recipeCountry) : 'Recipe origin'}</h2>
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
            </div>
        </div>
    )
}


