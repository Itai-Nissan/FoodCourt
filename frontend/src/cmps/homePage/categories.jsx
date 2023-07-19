import React from 'react'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import backImg from '../../assets/images/background/cutting-board-2680168_edit3.jpg'

export const Categories = (props) => {
    window.scrollTo(0, 0)

    return (
        <section className="categories">
            <h4>Explore by tags</h4>
            <div className="back-img">
                <img src={backImg} alt="" />
            </div>
            <div className="explore">
                <div className="explore-container">
                    <h4>Explore new recipes</h4>
                    <Link to="/ExplorRecipes">
                        <Button>Explore</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

