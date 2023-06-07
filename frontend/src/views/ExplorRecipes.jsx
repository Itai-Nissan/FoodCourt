import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

export const ExplorRecipes = (props) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch()
    let recipes = useSelector((state) => state.foodModule.foods)
    let loading = false

    useEffect(() => {
        resetFilter()
    }, [])

    function resetFilter() {
        dispatch(setFilterBy(''))
        onChangeFilter()
    }

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
        <div className='explore-recipes'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter>
            <FoodList foodList={recipes} />
        </div>
    )
}

