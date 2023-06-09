import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { utils } from '../services/utils'
import { removeFromFav } from '../store/actions/userActions'

import { Button } from '@mui/material'

export const UserProfile = (props) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const userRecipes = useSelector((state) => state.userModule.userRecipes)
    const userName = loggedInUser ? loggedInUser.userName : ''
    const userEmail = loggedInUser ? loggedInUser.userEmail : ''

    async function removeRecipeFromFav(recipeId) {
        if (!loggedInUser) return
        return dispatch(removeFromFav(loggedInUser, recipeId))
    }

    let userRecipe = ''
    if (userRecipes) userRecipe = userRecipes.map((recipe, index) => {
        let imgName = recipe.thumbnail_url
        const foodCredits = recipe.credits[0].name
        return <Link to={`/foodDetails/${recipe.id}`} key={index}>
            <div className='food-preview' key={index}>
                <section className="card-img">
                    <img alt="timer" src={recipe.thumbnail_url} />
                </section>
                <section className="card-body">
                    <div className="card-name">
                        <p>{utils.firstToCap(recipe.name)}</p>
                    </div>
                    {/* <div className="card-credits"> */}
                    {/* <p>{foodCredits}</p> */}
                    {/* <img src={foodCreditsImg} alt="" /> */}
                    {/* <Button onClick={() => removeRecipeFromFav(recipe.id)}>X</Button> */}
                    {/* </div> */}
                </section>
            </div >
        </Link>
    })

    let userFav = ''
    if (loggedInUser) userFav = loggedInUser.userFavorite.map((recipe, index) => {
        const foodCredits = recipe.credits[0].name
        const foodCreditsImg = recipe.credits[0].image_url
        return <div className='food-preview' key={index}>
            <section className="card-img">
                <Link to={`/foodDetails/${recipe.id}`} >
                    <img src={recipe.thumbnail_url} alt="" />
                </Link>
            </section>
            <section className="card-body">
                <Link to={`/foodDetails/${recipe.id}`} >
                    <div className="card-name">
                        <p>{recipe.name}</p>
                    </div>
                    <div className="card-credits">
                        <p>{foodCredits}</p>
                        <div className="credit-img">
                            <img src={foodCreditsImg} alt="" />
                        </div>
                    </div>
                </Link>
                <Button onClick={() => removeRecipeFromFav(recipe.favId)}>X</Button>
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

