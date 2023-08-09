import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Hero } from '../cmps/homePage/hero'
import { Shorts } from '../cmps/homePage/shorts'
import { Categories } from '../cmps/homePage/categories'
import { setFilterBy } from '../store/actions/foodActions'

export const HomePage = (props) => {
    const dispatch = useDispatch()
    window.scrollTo(0, 0)

    useEffect(() => {
        dispatch(setFilterBy(''))
    }, [])

    return (
        <div className='home-page'>
            <Hero></Hero>
            <Shorts></Shorts>
            <Categories></Categories>
        </div>
    )
}

