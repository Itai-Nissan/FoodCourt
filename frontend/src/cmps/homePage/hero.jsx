import React from 'react'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import backImg from '../../assets/images/background/il_fullxfull.2551070265_fcsh_edit.jpg'

export const Hero = (props) => {
    window.scrollTo(0, 0)

    return (
        <section className="hero">
            <div className="back-img">
                <img src={backImg} alt="" />
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

