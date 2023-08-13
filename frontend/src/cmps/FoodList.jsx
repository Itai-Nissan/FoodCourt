import React from 'react'
import { Link } from "react-router-dom"
import FoodPreview from './FoodPreview'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export default function FoodList({ foodList }) {

    if (!foodList || foodList.length === 0) return <div className='skeleton-list' >
        {[...Array(25)].map((e, i) => {
            return <Stack key={i} spacing={1}>
                <div className='skeleton-preview'>
                    <Skeleton variant="rounded" height={255} width={245} />
                    <Skeleton variant="text" height={20} sx={{ fontSize: '1rem' }} />
                    <br />
                    <div className="skeleton-footer">
                        <Skeleton variant="text" width={100} height={20} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="circular" width={40} height={40} />
                    </div>
                </div>
            </Stack>
        })}
    </div>
    return (
        <div className='food-list'>
            {foodList.map((food, index) => (
                <div key={index}>
                    <Link to={`/foodDetails/${food._id}`} >
                        <FoodPreview food={food} />
                    </Link>
                </div>
            ))}
        </div>
    )
}
