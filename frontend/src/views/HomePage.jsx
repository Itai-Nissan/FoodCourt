import React, { useState, useEffect, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import { foodService } from '../services/food.service'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'

class _HomePage extends Component {

    async componentDidMount() {
        this.props.loadFoodList()
        window.scrollTo(0, 0)
    }

    onRemoveFood = async (foodId) => {
        // await foodService.remove(foodId)
        // this.loadFoods()
        // await this.props.removeFood(foodId)
    }

    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadFoodList()
        this.props.setFilterBy('')
    }

    render() {
        const { foods } = this.props
        if (!foods) return <div>Loading...</div>

        return (
            <div className='food-app'>
                <Filter onChangeFilter={this.onChangeFilter}></Filter>
                {/* <button onClick={this.onChangeFilter}>Filterit</button> */}
                {/* <FoodFilter onChangeFilter={this.onChangeFilter} /> */}
                {/* <Link to="/food/edit">Add Food</Link> */}
                <FoodList history={this.props.history} onRemoveFood={this.onRemoveFood} foodList={foods} />
            </div>
        )
    }
}


const mapStateToProps = state => {

    return {
        foods: state.foodModule.foods
    }
}

const mapDispatchToProps = {
    loadFoodList,
    // removeFood,
    setFilterBy,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)

