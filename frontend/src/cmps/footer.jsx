import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilterBy } from '../store/actions/foodActions'
import { Link } from "react-router-dom"

export const Footer = (props) => {
    const dispatch = useDispatch()

    function toTop() {
        window.scroll(0, 0)
    }

    function setCategory(category) {
        let filterBy = {
            category
        }
        dispatch(setFilterBy(filterBy))
    }

    return (
        <div className="footer">
            <section className='resources container'>
                <div className="explore-container">
                    <div className="categories-links">
                        <Link onClick={() => { setCategory('cheese') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Cheese</h4>
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('Soup') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Soup</h4>
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('fried') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Fried</h4>
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('cheese') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Cheese</h4>
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('Soup') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Soup</h4>
                            </div>
                        </Link>
                        <Link onClick={() => { setCategory('fried') }} to="/ExplorRecipes">
                            <div className="category-link">
                                <h4>Fried</h4>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="links">
                    <Link to="/Contact">About Us</Link>
                    <Link to="/Contact">Contact Us</Link>
                    <Link to="/Privacy">Privacy Policy</Link>
                    <Link to="/Terms">Terms & Conditions</Link>
                    <Link to="/Api">Used Api's</Link>
                </div>

            </section>
                <div className="copy container">
                    <button onClick={toTop}>BACK TO TOP</button>
                    <h4>ITAI NISSAN &copy; 2023</h4>
                </div>
        </div>
    )
}

