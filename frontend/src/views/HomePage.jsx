import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { Hero } from '../cmps/homePage/hero'
import { Shorts } from '../cmps/homePage/shorts'
import { Categories } from '../cmps/homePage/categories'

import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

import backImg from '../assets/images/background/il_fullxfull.2551070265_fcsh_edit.jpg'

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
            <Hero></Hero>
            <Shorts></Shorts>
            <Categories></Categories>
            {/* <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter> */}
            {/* <FoodList foodList={recipes} /> */}
        </div>
    )
}

