import React, { useState, useEffect, Component } from 'react'

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
                <div className='home-page container'>
                    <h1>HomePage</h1>
                    {foodList.map((rec, index) => (
                        <div key={index}>
                            <p>{rec.name}</p>
                            <img src={rec.thumbnail_url} alt=""/>
                        </div>
                    ))}
                </div>
            )
        }
    }
}

