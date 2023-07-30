import React from 'react'
import { Hero } from '../cmps/homePage/hero'
import { Shorts } from '../cmps/homePage/shorts'
import { Categories } from '../cmps/homePage/categories'
import { Footer } from '../cmps/homePage/footer'

export const HomePage = (props) => {
    window.scrollTo(0, 0)

    return (
        <div className='home-page'>
            <Hero></Hero>
            <Shorts></Shorts>
            <Categories></Categories>
            <Footer></Footer>
            {/* <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter> */}
            {/* <FoodList foodList={recipes} /> */}
        </div>
    )
}

