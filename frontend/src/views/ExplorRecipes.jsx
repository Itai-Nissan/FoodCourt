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
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)


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
                let count = 1
                if (filterBy.category) {
                    count = Math.floor(res.foodList.length / pageSize)
                } else {
                    count = Math.floor(res.count / pageSize)
                }
                if (count <= 0) count = 1
                setPagesCount(count)
                setRecipes(res.foodList)
            })
    }

    function handlePageChange(event, page) {
        setCurrentPage(page)
        setRecipes([])
        // setLoading('true')
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize

        setAmountCount(amountCount + pageSize)
        dispatch(loadFoodList(from, to))
            .then((res) => {
                setRecipes(res.foodList)
                // setLoading(false)
            })
    }

    function onChangeFilter(filterBy) {
        setCurrentPage(1)
        setRecipes([])
        // setLoading(true)
        setAmountCount(pageSize)
        window.scrollTo(0, 0)
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, pageSize))
            .then((res) => {
                if (filterBy.text === '' || filterBy.text === 'all') {
                    setPagesCount(Math.floor(res.count / pageSize))
                }
                if (res.foodList.length < pageSize) {
                    setPagesCount(1)
                }
                else {
                    setPagesCount(Math.floor(res.count / pageSize))
                }
                setRecipes(res.foodList)
                // setLoading(false)
            })
    }

    return (
        <div className='explore-recipes container'>
            <Filter onChangeFilter={onChangeFilter} filterBy={filterBy}></Filter>
            {/* <Filter onChangeFilter={onChangeFilter} isLoading={loading ? loading.toString() : undefined} filterBy={filterBy}></Filter> */}
            <section className="pagination">
                <Pagination onChange={handlePageChange} page={currentPage} count={pagesCount} />
            </section>
            <FoodList foodList={recipes} />
        </div>
    )
}



