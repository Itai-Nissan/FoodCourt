import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

export const HomePage = (props) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch()
    let recipes = useSelector((state) => state.foodModule.foods)
    
    function onChangeFilter(filterBy) {
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList())
            .then(() => {
                dispatch(setFilterBy(''))
            })
    }

    if (!recipes) return <div>Loading...</div>
    return (
        <div className='home-page'>
            <Filter onChangeFilter={onChangeFilter}></Filter>
            <FoodList foodList={recipes} />
        </div>
    )
}

