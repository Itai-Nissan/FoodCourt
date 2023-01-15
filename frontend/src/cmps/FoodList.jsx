import React from 'react'
import FoodPreview from './FoodPreview'


export default function FoodList({ foodList }) {
    
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
