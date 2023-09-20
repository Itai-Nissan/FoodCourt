import React from 'react'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'

export const Hero = (props) => {
    window.scrollTo(0, 0)

    return (
        <section className="hero">
            <div className="back-img">
                <img src='https://res.cloudinary.com/counditai/image/upload/v1695206941/Cutting-board/backgroud/cutting-board-925544_edit2_t5qvoo.jpg' alt="" />
            </div>
            <div className="explore">
                <div className="explore-container">
                    <Link to="/ExplorRecipes">
                        <h4>Explore new recipes</h4>
                        <Button>Explore</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

