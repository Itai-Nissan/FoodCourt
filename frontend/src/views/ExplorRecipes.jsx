import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'
import InfiniteScroll from 'react-infinite-scroll-component';


export const ExplorRecipes = (props) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch()
    let recipes = useSelector((state) => state.foodModule.foods)
    let loading = false

    useEffect(() => {
        resetFilter()
    }, [])

    function resetFilter() {
        dispatch(setFilterBy(''))
        onChangeFilter()
    }

    function onChangeFilter(filterBy) {
        loading = true
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, 24))
            .then(() => {
                loading = false
                dispatch(setFilterBy(''))
            })
    }

    return (
        <div className='explore-recipes'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading}></Filter>
            {/* <InfiniteScroll
                dataLength={recipes ? recipes.length : 0} //This is important field to render the next data
                next={onChangeFilter}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                // below props only if you need pull down functionality
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
            >
                {recipes}
            </InfiniteScroll> */}

            <FoodList foodList={recipes} />
        </div>
    )
}

