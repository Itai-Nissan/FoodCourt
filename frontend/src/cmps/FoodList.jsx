import React from 'react'
import FoodPreview from './FoodPreview'


export default function FoodList({ foodList }) {
    
    if(!foodList) return <div><h1>loading</h1></div>
    return (
        <div className='food-list'>
            {foodList.map((food, index) => (
                <div key={index}>
                    <FoodPreview food={food}/>
                </div>
            ))}
        </div>
    )
}
