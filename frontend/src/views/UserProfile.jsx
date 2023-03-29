import React, { useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { removeFromFav } from '../store/actions/userActions'

import { Button } from '@mui/material'

export const UserProfile = (props) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const userName = loggedInUser.userName
    const userEmail = loggedInUser.userEmail

    async function removeRecipeFromFav(recipeId) {
        if (!loggedInUser) return
        return dispatch(removeFromFav(loggedInUser, recipeId))
    }

    let userRecipe = ''
    if (loggedInUser.userRecipe) userRecipe = loggedInUser.userRecipe.map((recipe, index) => {
        let imgName = recipe.thumbnail_url
        const foodCredits = recipe.credits[0].name
        return <div className='food-preview' key={index}>
            <section className="card-img">
                <Link to={`/foodDetails/${recipe.id}`} >
                    <img alt="timer" src={recipe.thumbnail_url} />
                </Link>
            </section>
            <section className="card-body">
                <div className="card-name">
                    <p>{recipe.name}</p>
                </div>
                <div className="card-credits">
                    <p>{foodCredits}</p>
                    {/* <img src={foodCreditsImg} alt="" /> */}
                    {/* <Button onClick={() => removeRecipeFromFav(recipe.id)}>X</Button> */}
                </div>
            </section>
        </div>
    })


    let userFav = ''
    if (loggedInUser.userFavorite) userFav = loggedInUser.userFavorite.map((recipe, index) => {
        const foodCredits = recipe.credits[0].name
        const foodCreditsImg = recipe.credits[0].image_url
        return <div className='food-preview' key={index}>
            <section className="card-img">
                <Link to={`/foodDetails/${recipe.id}`} >
                    <img src={recipe.thumbnail_url} alt="" />
                </Link>
            </section>
            <section className="card-body">
                <div className="card-name">
                    <p>{recipe.name}</p>
                </div>
                <div className="card-credits">
                    <p>{foodCredits}</p>
                    <img src={foodCreditsImg} alt="" />
                    <Button onClick={() => removeRecipeFromFav(recipe.id)}>X</Button>
                </div>
            </section>
        </div>
    })

    return (
        <div className='user-profile'>
            <section className='user-details'>
                <div className="header">
                    <h1>Hi {userName}</h1>
                </div>
                <div className="user-content">
                    <section>
                        <h4>Your favorites</h4>
                        <div className="food-list">
                        {userFav}
                        </div>
                        </section>
                    <section className='user-recipe'>
                        <h4>Your recipes</h4>
                        <div className="">
                        {userRecipe}
                        </div>
                        </section>
                </div>
            </section>
        </div>
    )
}

