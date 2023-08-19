import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { RecipeSkeleton } from '../RecipeSkeleton'

export const SingleRecipe = (props) => {
    window.scrollTo(0, 0)
    const [isFav, setIsFav] = useState(() => {
        let ans = false
        if (props.loggedInUser) {
            props.loggedInUser.userFavorite.map((recipe) => {
                if (recipe.id === props.foodById.id) {
                    ans = true
                    return
                }
            })
        }
        return ans
    })

    useEffect(() => {
        setIsFav(() => {
            let ans = false
            if (props.loggedInUser) {
                props.loggedInUser.userFavorite.map((recipe) => {
                    if (recipe.id === props.foodById.id) {
                        ans = true
                        return
                    }
                })
            }
            return ans
        })
    })

    function loggedUserRecipe() {
        if (props.loggedInUser && props.loggedInUser._id === props.foodById.author) {
            return true
        }
        else return false
    }

    if (!props.foodById) return <div>
        <RecipeSkeleton></RecipeSkeleton>
    </div>

    return (
        <div className='food-details'>
            <section className='details-left'>
                <div className="header">
                    <h1>{props.foodById.name}</h1>
                    {/* <br /> */}
                </div>
                <h2>Recipe origin - {props.foodById.country}</h2>
                <p>{props.foodById.description}</p>
                <div className="food-ingredients">
                    <h2>Ingredients:</h2>
                    <div className='ingredients-table'>
                        {props.foodById.sections ? props.foodById.sections.map((component, index) => (
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
                    {props.foodById.instructions ? props.foodById.instructions.map((step, index) => (
                        <div key={index}>
                            <h4>Step {index + 1}</h4>
                            <p>{step.display_text}</p>
                            <hr />
                        </div>
                    )) : ''}
                </div>
            </section>
            <section className='details-right'>
                {
                    !loggedUserRecipe() ?
                        isFav ?
                            <button className='basic-button' onClick={props.removeRecipeFromFav}> Remove from list</button>
                            :
                            <button className='basic-button' onClick={props.addFoodToFav}> Add to list</button>
                        : <Link className='confirm-button' to={`/Edit-recipe/${props.foodById._id}`} >Edit recipe</Link>
                    }
                <div className="sticky-right">
                    <div className="food-video">
                        <img className='' src={props.foodById.thumbnail_url} alt="" />
                        {props.foodById.original_video_url ?
                            <video controls autoPlay muted src={props.foodById.original_video_url}></video> :
                            null
                        }
                    </div>
                </div>
            </section >

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div >
    )
}