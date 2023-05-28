import React from 'react'
import { Link } from "react-router-dom";

export default function FoodPreview({ food }) {

    const foodCredits = food.credits[0].name
    const foodCreditsImg = food.credits[0].image_url
    console.log(food);

    return (
        <div className='food-preview'>
            <section className="card-img">
                <Link to={`/foodDetails/${food.id}`} >
                    <img src={food.thumbnail_url} alt="" />
                </Link>
            </section>
            <section className="card-body">
                <div className="card-name">
                    <p>{food.name}</p>
                </div>
                <div className="card-credits">
                    <p>{foodCredits}</p>
                    <div className="credit-img">
                        <img src={foodCreditsImg} alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}
