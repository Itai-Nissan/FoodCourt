import React from 'react'
import { Link } from "react-router-dom";



export default function FoodPreview({ food }) {

    return (
        <div className='food-preview'>
            <div className="card-header">
                <p>{food.name}</p>
            </div>
            <div className="card-img">
                <Link to={`/foodDetails/${food.id}`} >
                    <img src={food.thumbnail_url} alt="" />
                </Link>
            </div>
        </div>
    )
}
