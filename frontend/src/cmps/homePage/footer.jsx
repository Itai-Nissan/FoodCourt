import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import { setFilterBy } from '../../store/actions/foodActions'

import backImg from '../../assets/images/background/cutting-board-2680168_edit2.jpg'
import cheese from '../../assets/images/background/healthiest-cheese-1296x728-swiss.jpg'
import soup from '../../assets/images/background/Homemade-Tomato-Soup-1.jpg'
import fried from '../../assets/images/background/How-to-Use-A-Wok-For-Stir-Frying-Steaming.jpg'

export const Footer = (props) => {

    return (
        <div className="footer">
            <section className='resources'>
                <Link to="/Contact">About Us</Link>
                <Link to="/Contact">Contact Us</Link>
                <Link to="/Api">Used Api's</Link>
            </section>
        </div>
    )
}

