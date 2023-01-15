import React, { useState, useEffect, Component } from 'react'
import FoodList from '../cmps/FoodList'

import { foodService } from '../services/food.service'


export class HomePage extends Component {

    state = {
        foodList: null,
    }

    componentDidMount() {
        this.loadFoodList()
    }

    async loadFoodList() {
        try {
            let foodList = await foodService.getFood()
            this.setState({ foodList })
            console.log(foodList)
        } catch (err) {
            console.log('err:', err)
        }
    }


    render() {
        const { foodList } = this.state
        if (foodList === null) return <div>Loading...</div>
        else {
            return (
                <div className='home-page'>
                    <h1>HomePage</h1>
                    <FoodList foodList={foodList}/>
                </div>
            )
        }
    }
}

