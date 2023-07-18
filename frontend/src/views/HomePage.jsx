import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'

import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

import backImg from '../assets/images/background/il_fullxfull.2551070265_fcsh.jpg'

export const HomePage = (props) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch()
    // let recipes = useSelector((state) => state.foodModule.foods)
    // console.log(recipes);
    let loading = false
    // let numberOfCat = new Array(3).fill([])

    // useEffect(() => {
    //     resetFilter()
    // }, [])

    // function resetFilter() {
    //     dispatch(setFilterBy(''))
    //     onChangeFilter()
    // }

    function onChangeFilter(filterBy) {
        loading = true
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList())
            .then(() => {
                loading = false
                dispatch(setFilterBy(''))
            })
    }

    return (
        <div className='home-page'>
            <section className="hero">
                <div className="back-img">
                    <img src={backImg} alt="" />
                </div>
                <div className="explore">
                    <div className="explore-container">
                        <h4>Explore new recipes</h4>
                        <Link to="/ExplorRecipes">
                            <Button>Explore</Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="categories container">
                <div className="Salad box">Salad</div>
                <div className="Soup box">Soup</div>
                <div className="Deserts box">Deserts</div>
            </section>
            {/* <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter> */}
            {/* <FoodList foodList={recipes} /> */}
        </div>
    )
}

