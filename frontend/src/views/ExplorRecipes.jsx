import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'
import InfiniteScroll from 'react-infinite-scroll-component'

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';



export const ExplorRecipes = (props) => {

    const dispatch = useDispatch()
    // let recipes = []
    // let recipes = useSelector((state) => state.foodModule.foods)
    let filterBy = useSelector((state) => state.foodModule.filterBy)

    const [recipes, setRecipes] = useState([])
    // const [filterBy, setStateFilterBy] = useState({})
    const [pageSize, setPageSize] = useState(24)
    const [amountCount, setAmountCount] = useState(pageSize)
    const [loading, setLoading] = useState(false)
    const [pagesCount, setPagesCount] = useState()


    useEffect(() => {
        window.scrollTo(0, 0)
        resetFilter()
    }, [])

    function resetFilter() {
        if (!filterBy.category) {
            dispatch(setFilterBy(''))
        }
        dispatch(loadFoodList(0, pageSize))
            .then((res) => {
                setRecipes(res.foodList)
                setPagesCount(Math.floor(res.count / pageSize))
            })
    }

    function handlePageChange(event, page) {
        setRecipes([])
        setLoading('true')
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize

        setAmountCount(amountCount + pageSize)
        dispatch(loadFoodList(from, to))
            .then((res) => {
                setRecipes(res.foodList)
                setLoading(false)
            })
    }

    function onChangeFilter(filterBy) {
        setRecipes([])
        setLoading('true')
        setAmountCount(pageSize)
        window.scrollTo(0, 0)
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, pageSize))
            .then((res) => {
                setRecipes(res.foodList)
                setLoading(false)
            })
    }

    return (
        <div className='explore-recipes container'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading ? loading : undefined} filterBy={filterBy}></Filter>
            <section className="pagination">
                <Pagination onChange={handlePageChange} count={pagesCount} />
            </section>
            <FoodList foodList={recipes} />
        </div>
    )
}



