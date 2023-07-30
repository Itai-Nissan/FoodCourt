import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { setFilterBy } from '../../store/actions/foodActions'

import backImg from '../../assets/images/background/cutting-board-2680168_edit2.jpg'
import cheese from '../../assets/images/background/healthiest-cheese-1296x728-swiss.jpg'
import soup from '../../assets/images/background/Homemade-Tomato-Soup-1.jpg'
import fried from '../../assets/images/background/How-to-Use-A-Wok-For-Stir-Frying-Steaming.jpg'

export const Categories = (props) => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()

    function setCategory(category) {
        let filterBy = {
            category
        }
        dispatch(setFilterBy(filterBy))
    }

    return (
        <section className="categories">
            <div className="back-img">
                <img src={backImg} alt="" />
            </div>
            <div className="explore">
                <div className="explore-container">
                    <div className="categories-links">
                        <Link onClick={() => { setCategory('cheese') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Cheese</h4>
                                <img src={cheese} alt="" />
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('Soup') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Soup</h4>
                                <img src={soup} alt="" />
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('fried') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Fried</h4>
                                <img src={fried} alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

