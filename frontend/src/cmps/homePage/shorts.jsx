import React from 'react'
import { Link } from "react-router-dom"

export const Shorts = (props) => {
    window.scrollTo(0, 0)


    return (
        <section className="shorts container">
            <Link to="/Signup">
                <div className="short-join box">Join our community</div>
            </Link>
            <Link to="/ExplorRecipes">
                <div className="short-explore box">Explore</div>
            </Link>
            <Link to="/Add-recipe">
                <div className="short-add box">Add new recipes</div>
            </Link>
        </section>
    )
}

