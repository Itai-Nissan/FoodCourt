import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { setFilterBy } from '../../store/actions/foodActions'

export const Categories = (props) => {
    const dispatch = useDispatch()

    function setCategory(category) {
        let filterBy = {
            category
        }
        dispatch(setFilterBy(filterBy))
    }

    return (
        <section className="categories">
            <hr />
            <h2>Explore by categories</h2>
            <div className="categories-content">
                <div className="back-img">
                    <img src='https://res.cloudinary.com/counditai/image/upload/v1695206941/Cutting-board/backgroud/cutting-board-2680168_edit2_mdw3c5.jpg' alt="" />
                </div>
                <div className="explore">
                    <div className="explore-container">
                        <div className="categories-links">
                            <Link onClick={() => { setCategory('cheese') }} to="/ExplorRecipes">
                                <div className="category-link">
                                    <div className="category-text">
                                        <h4>Cheese</h4>
                                    </div>
                                    <img src='https://res.cloudinary.com/counditai/image/upload/v1695206937/Cutting-board/backgroud/healthiest-cheese-1296x728-swiss_mfjtmk.jpg' alt="" />
                                </div>
                            </Link>
                            <Link onClick={() => { setCategory('Soup') }} to="/ExplorRecipes">
                                <div className="category-link">
                                    <div className="category-text">
                                        <h4>Soup</h4>
                                    </div>
                                    <img src='https://res.cloudinary.com/counditai/image/upload/v1695206938/Cutting-board/backgroud/Homemade-Tomato-Soup-1_osg8hn.jpg' alt="" />
                                </div>
                            </Link>
                            <Link onClick={() => { setCategory('fried') }} to="/ExplorRecipes">
                                <div className="category-link">
                                    <div className="category-text">
                                        <h4>Fried</h4>
                                    </div>
                                    <img src='https://res.cloudinary.com/counditai/image/upload/v1695206937/Cutting-board/backgroud/How-to-Use-A-Wok-For-Stir-Frying-Steaming_erpdfc.jpg' alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

