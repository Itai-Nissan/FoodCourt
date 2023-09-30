import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { setFilterBy, loadFoodList } from '../../store/actions/foodActions'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'




export const Recommendation = (props) => {
    const dispatch = useDispatch()

    const [pageSize, setPageSize] = useState(10)
    const [recipes, setRecipes] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        loadRecipes()
    }, [])

    function loadRecipes() {
        dispatch(setFilterBy('cheese'))
        dispatch(loadFoodList(0, pageSize))
            .then((res) => {
                console.log(res.recipeList);
                setRecipes(res.recipeList)
                // let count = Math.ceil(res.count / pageSize)
                // if (count <= 0) count = 1
                // setPagesCount(count)
                // setResultsNumber(res.count)
                // setRecipes(res.recipeList)
            })

    }

    function setRecommendation(category) {
    }

    return (
        <section className="recommendation container">
            <hr />
            <h2>Recommended recipes</h2>
            <div className="recommendation-carousel">{
                recipes ?
                    <AliceCarousel mouseTracking  items={recipes.map((recipe, index) => {
                        return <Link to={`/foodDetails/${recipe._id}`} key={index}>
                            <div className='carousel'>
                                <section className='recommendation-img'>
                                    <img src={recipe.thumbnail_url} alt="" />
                                </section>
                                <section className='recommendation-name'>
                                    <p>{recipe.name}</p>
                                </section>
                            </div>
                        </Link>
                    })} /> : null
            }
            </div>
        </section>
    )
}

