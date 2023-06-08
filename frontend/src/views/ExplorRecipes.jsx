import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'
import InfiniteScroll from 'react-infinite-scroll-component';


export const ExplorRecipes = (props) => {

    const dispatch = useDispatch()
    let recipes = useSelector((state) => state.foodModule.foods)

    const [amountPerList, setAmountPerList] = useState(24)
    const [amountCount, setAmountCount] = useState(amountPerList)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // setAmountCount(amountPerList)
        window.scrollTo(0, 0)
        console.log('using effect');
        resetFilter()
    }, [])

    function resetFilter() {
        dispatch(setFilterBy(''))
    }

    function loadNext() {
        setLoading(true)
        setAmountCount(amountCount + amountPerList)
        dispatch(loadFoodList(0, amountCount))
            .then(() => {
                setLoading(false)
                dispatch(setFilterBy(''))
            })
    }

    function onChangeFilter(filterBy) {
        setLoading(true)
        setAmountCount(amountPerList)
        window.scrollTo(0, 0)
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, amountCount))
            .then(() => {
                setLoading(false)
                dispatch(setFilterBy(''))
            })
    }

    return (
        <div className='explore-recipes'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter>
            <InfiniteScroll
                dataLength={recipes ? recipes.length * 10 : amountPerList}
                next={loadNext}
                hasMore={true}
                scrollThreshold={'100%'}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <FoodList foodList={recipes} />
            </InfiniteScroll>
        </div>
    )
}

