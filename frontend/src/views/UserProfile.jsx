import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { utils } from '../services/utils'
import AliceCarousel from 'react-alice-carousel'
import { Dropdown } from '../cmps/Dropdown'
import 'react-alice-carousel/lib/alice-carousel.css'

export const UserProfile = (props) => {
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const userRecipes = useSelector((state) => state.userModule.userRecipes)

    let userRecipe = ''
    if (userRecipes) userRecipe = userRecipes.map((recipe, index) => {
        return <Link to={`/foodDetails/${recipe._id}`} key={index}>
            <div className='food-preview' key={index}>
                <section className="card-img">
                    <img alt="timer" src={recipe.thumbnail_url} />
                </section>
                <section className="card-body">
                    <div className="card-name">
                        <p>{utils.firstToCap(recipe.name)}</p>
                    </div>
                </section>
            </div >
        </Link>
    })

    let userFav = ''
    if (loggedInUser) userFav = loggedInUser.userFavorite.map((recipe, index) => {
        return <div className='food-preview' key={index}>
            <section className="card-body">
                <Link to={`/foodDetails/${recipe._id}`} >
                    <div className="card-name">
                        <p>{recipe.name}</p>
                    </div>
                </Link>
            </section>
            <section className="card-img">
                <Link to={`/foodDetails/${recipe._id}`} >
                    <img src={recipe.thumbnail_url} alt="" />
                </Link>
            </section>
        </div>
    })

    return (
        <div className='user-profile container'>
            <section className='user-details'>
                <div className="header">
                </div>
                <div className="user-content">
                    <section className='user-fav'>
                        <div className="fav-header">
                            <h2>Your favorites</h2>
                            <div className="drop-menu">
                                {loggedInUser ? <Dropdown></Dropdown> : null}
                            </div>
                        </div>
                        <div className="food-list">
                            {
                                userFav ? <AliceCarousel
                                    mouseTracking
                                    items={userFav}
                                /> : ''
                            }
                        </div>
                    </section>
                    <hr />
                    <section className='user-recipe'>
                        <h2>Your recipes</h2>
                        <div className="user-recipe-box">
                            {
                                userRecipe ? userRecipe : ''
                            }
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

