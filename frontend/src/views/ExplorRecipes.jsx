import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../store/actions/foodActions'
import FoodList from '../cmps/FoodList'
import { Filter } from '../cmps/Filter'
import Pagination from '@mui/material/Pagination';

export const ExplorRecipes = () => {

    const dispatch = useDispatch()
    let filterBy = useSelector((state) => state.foodModule.filterBy)

    const [recipes, setRecipes] = useState([])
    const [pageSize, setPageSize] = useState(25)
    const [amountCount, setAmountCount] = useState(pageSize)
    const [loading, setLoading] = useState(false)
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [resultsNumber, setResultsNumber] = useState(Number)


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
                let count = Math.ceil(res.count / pageSize)
                if (count <= 0) count = 1
                setPagesCount(count)
                setResultsNumber(res.count)
                setRecipes(res.foodList)
            })
    }

    function handlePageChange(event, page) {
        setCurrentPage(page)
        setRecipes([])
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize

        setAmountCount(amountCount + pageSize)
        dispatch(loadFoodList(from, to))
            .then((res) => {
                setRecipes(res.foodList)
            })
    }

    function onChangeFilter(filterBy) {
        setCurrentPage(1)
        setRecipes([])
        setLoading(true)
        setAmountCount(pageSize)
        window.scrollTo(0, 0)
        dispatch(setFilterBy(filterBy))
        dispatch(loadFoodList(0, pageSize))
            .then((res) => {
                if (filterBy.text === '' || filterBy.text === 'all') {
                    setPagesCount(Math.ceil(res.count / pageSize))
                }
                if (res.foodList.length < pageSize) {
                    setPagesCount(1)
                }
                else {
                    setPagesCount(Math.ceil(res.count / pageSize))
                }
                setResultsNumber(res.count)
                setRecipes(res.foodList)
                setLoading(false)
            })
    }

    return (
        <div className='explore-recipes container'>
            <Filter onChangeFilter={onChangeFilter} isLoading={loading ? loading.toString() : undefined} resultsNumber={resultsNumber} filterBy={filterBy}></Filter>
            <section className="pagination">
                <Pagination onChange={handlePageChange} page={currentPage} count={pagesCount} />
            </section>
            <FoodList foodList={recipes} />
        </div>
    )
}



