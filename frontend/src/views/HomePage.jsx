import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

export const HomePage = (props) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch()
    let recipes = useSelector((state) => state.foodModule.foods)
    let loading = false
    const listSkeleton = 8


    function onChangeFilter(filterBy) {
        loading = true
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList())
            .then(() => {
                loading = false
                dispatch(setFilterBy(''))
            })
    }


    // if (!recipes) return <div>
    //     <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter>
    // </div>
    return (
        <div className='home-page'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter>
            <FoodList foodList={recipes} />
        </div>
    )
}

