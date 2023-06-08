import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { foodService } from '../../services/food.service'
import { addToFav } from '../../store/actions/userActions'
import { loadUser } from '../../store/actions/userActions'
import { utils } from '../../services/utils'
import { Button } from '@mui/material'
import { RecipeSkeleton } from '../RecipeSkeleton'

export const MultiRecipe = (props) => {
    window.scrollTo(0, 0)

    function loggedUserRecipe() {
        if (props.loggedInUser && props.loggedInUser._id === props.recipe.userId) {
            return true
        }
        else return false
    }

    if (!props.recipe) return <div>
        <RecipeSkeleton></RecipeSkeleton>
    </div>

    return (
        <div className='food-details'>
            <img className='multi-details-bg' src={props.recipe.thumbnail_url} alt="" />
            <section className='details-left'>
                <h1>{props.recipe.name}</h1>
                <br />
                <h2>Recipe origin - {props.recipe.country}</h2>
                <div className="food-ingredients">
                    <h2>Ingredients:</h2>
                    <div className='ingredients-table'>
                        {props.recipe.sections ? props.recipe.sections.map((component, index) => (
                            <div key={index}>
                                <h3>{component.name}</h3>
                                <div>
                                    {component.components.map((componentText, i) => (
                                        <p key={i}>
                                            {componentText.raw_text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )) : ''}
                    </div>
                </div>
                <div className="food-instructions">
                    <h2>Instructions:</h2>
                    {props.recipe.instructions ? props.recipe.instructions.map((step, index) => (
                        <div key={index}>
                            <h4>Step {index + 1}</h4>
                            <p>{step.display_text}</p>
                            <hr />
                        </div>
                    )) : ''}
                </div>
            </section>
            <section className='details-right'>
                <div className="sticky-right">
                    <div className="food-video">
                        {props.recipe.original_video_url ? <video controls autoPlay muted
                            src={props.recipe.original_video_url}></video> : null}
                    </div>
                    {loggedUserRecipe() ? null : <Button onClick={props.addFoodToFav}> Add to list</Button>}
                    {loggedUserRecipe() ? <Link to={`/Edit-recipe/${props.recipe.id}`} >Edit recipe</Link> : null}
                </div>
            </section>

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div>
    )
}