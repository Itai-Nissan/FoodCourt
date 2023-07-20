import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import { setFilterBy } from '../../store/actions/foodActions'

import backImg from '../../assets/images/background/cutting-board-2680168_edit3.jpg'

export const Categories = (props) => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    // const [filterBy, setStateFilterBy] = useState({})

    function setCategory(category) {
        let filterBy = {
            category
        }
        dispatch(setFilterBy(filterBy))
    }

    return (
        <section className="categories">
            <h4>Explore by tags</h4>
            <div className="back-img">
                <img src={backImg} alt="" />
            </div>
            <div className="explore">
                <div className="explore-container">
                    <h4>Explore new recipes</h4>
                    <Link onClick={() => { setCategory('cheese') }} to="/ExplorRecipes">
                        Cheese
                    </Link>
                    <Link onClick={() => { setCategory('Soup') }} to="/ExplorRecipes">
                        Soup
                    </Link>
                    <Link onClick={() => { setCategory('fried') }} to="/ExplorRecipes">
                        Fried
                    </Link>
                </div>
            </div>
        </section>
    )
}

