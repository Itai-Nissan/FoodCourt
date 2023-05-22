import React from 'react'
import { utils } from '../../services/utils'


export const AddRecipeOutput = (props) => {

    // console.log(props.ingredientList)

    return (
        <div className="recipe-output">
            <div className='recipe-output'>
                <img className='recipe-details-bg' src={props.imageOutput} alt="" />
                <div className="food-details">
                    <section className='details-left'>
                        <h2>{props.recipeName ? utils.firstToCap(props.recipeName) : 'Recipe name'}</h2>
                        <h2>{props.recipeCountry ? utils.firstToCap(props.recipeCountry) : 'Recipe origin'}</h2>
                        <h3 >{props.ingredientList ? '' : 'Ingredients'}</h3>
                        {props.ingredientList ? null : <hr />}
                        {props.ingredientList ? props.ingredientList.map((ingredient, index) => {
                            return <div className="add-remove-ingredient" key={index}>
                                <p>{utils.firstToCap(props.ingredientList[index].raw_text)}</p>
                            </div>
                        }) : ''
                        }
                        {/* <h3 >{props.stepList[0].display_text === null ? '' : 'Instructions'}</h3> */}
                        {/* {props.stepList[0].display_text === null ? null : <hr />} */}
                        {props.stepList ? props.numberOfSteps.map((ingredient, index) => {
                            return <div className="add-remove-step" key={index}>
                                <h4>Step {index + 1}</h4>
                                {/* <p>{props.stepList[index].display_text}</p> */}
                                <p>{utils.firstToCap(props.stepList[index].display_text)}</p>
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


