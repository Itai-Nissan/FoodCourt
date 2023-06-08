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
    const [amountCount, setAmountCount] = useState(24)

    let loading = false

    useEffect(() => {
        window.scrollTo(0, 0)
        resetFilter()
    }, [])

    function resetFilter() {
        dispatch(setFilterBy(''))
    }

    function loadNext() {
        loading = true
        setAmountCount(amountCount + amountPerList)
        dispatch(loadFoodList(0, amountCount))
            .then(() => {
                loading = false
                dispatch(setFilterBy(''))
            })
    }

    function onChangeFilter(filterBy) {
        loading = true
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, amountCount))
            .then(() => {
                loading = false
                dispatch(setFilterBy(''))
            })
    }

    return (
        <div className='explore-recipes'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading} amountCount={amountCount}></Filter>
            <InfiniteScroll
                dataLength={amountCount * 2}
                next={loadNext}
                hasMore={true}
                scrollThreshold={'200px'}
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

