import React, { useState, useEffect, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import { foodService } from '../services/food.service'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

import React from 'react'

export const HomePage = (props) => {
    window.scrollTo(0, 0)

    const [recipes, setRecipes] = useState(null)



    useEffect(() => {
        loadFoodList()
    }, [params.id])

    onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        const updatedRecipes = dispatch(loadFoodList())
        console.log(updatedRecipes)
        setRecipes(updatedRecipes)
        dispatch(setFilterBy(''))
    }

    if (!recipes) return <div>Loading...</div>

    return (
        <div className='food-app'>
            <Filter onChangeFilter={this.onChangeFilter}></Filter>
            {/* <button onClick={this.onChangeFilter}>Filterit</button> */}
            {/* <FoodFilter onChangeFilter={this.onChangeFilter} /> */}
            {/* <Link to="/food/edit">Add Food</Link> */}
            <FoodList history={this.props.history} onRemoveFood={this.onRemoveFood} foodList={recipes} />
        </div>
    )
}

