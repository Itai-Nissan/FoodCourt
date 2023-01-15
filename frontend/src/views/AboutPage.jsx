import React, { useState, useEffect, Component } from 'react'
import FoodList from '../cmps/FoodList'

import { foodService } from '../services/food.service'


export class AboutPage extends Component {


    componentDidMount() {
    }

    render() {
        return (
            <div className='home-page'>
                Abouut
            </div>
        )
    }
}

