import { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getFoodById } from '../store/actions/foodActions'
import { foodService } from '../services/food.service'

export const FoodDetails = (props) => {
    // const dispatch = useDispatch()

    // const foodById = useSelector(state => state.foodModule.foodById)
    // console.log(foody)

    const [foodById, setFood] = useState(null)
    const params = useParams(

    )
    // const navigate = useNavigate()


    useEffect(() => {
        loadFood()
    }, [params.id])


    async function loadFood() {
        const foodId = params.id
        // dispatch(getFoodById(foodId))

        const getFoodById = await foodService.getById(foodId)
        console.log(getFoodById);
        // console.log(JSON.parse(getFoodById))
        // getFoodById = JSON.parse(getFoodById)
        setFood(getFoodById)
        // console.log(food)
    }

    // const onBack = () => {
    //     navigate('/')
    // }


    // console.log('render');
    if (!foodById) return <div>Loading...</div>
    return (
        <div className='food-details'>
            <img className='details-bg' src={foodById.thumbnail_url} alt="" />
            <section className='details-left'>
                <h2>{foodById.name}</h2>
                <br />
                <div className="food-instructions">
                    {foodById.instructions.map((step, index) => (
                        <div key={index}>
                            <h4>Step {index + 1}</h4>
                            <br />
                            <p>{step.display_text}</p>
                            <br />
                        </div>
                    ))}
                </div>
            </section>
            <section className='details-right'>
                <video controls autoPlay muted
                    src={foodById.original_video_url}></video>
            </section>

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food/r3' >Next Food</Link> */}
        </div>
    )
}