import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { foodService } from '../services/food.service'
import { addToFav } from '../store/actions/userActions'
import { Button } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const FoodDetails = (props) => {
    window.scrollTo(0, 0)

    const [foodById, setFood] = useState(null)
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const params = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        loadFood()
    }, [params.id])

    async function loadFood() {
        const foodId = params.id
        const getFoodById = await foodService.getById(foodId)
        setFood(getFoodById)
    }

    async function addFoodToFav() {
        if (!loggedInUser) return
        return dispatch(addToFav(loggedInUser, foodById))
    }


    if (!foodById) return <div className='skeleton-list' >
        {[...Array(16)].map((e, i) => {
            return <Stack key={i} spacing={1}>
                <div className='skeleton-preview'>
                    <Skeleton variant="rounded" height={140} />
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
        <div className='food-details'>
            <img className='details-bg' src={foodById.thumbnail_url} alt="" />
            <section className='details-left'>
                <h1>{foodById.name}</h1>
                <br />
                <h2>Recipe origin - {foodById.country}</h2>
                <div className="food-ingredients">
                    <h2>Ingredients:</h2>
                    <div className='ingredients-table'>
                        {foodById.sections.map((component, index) => (
                            <div key={index}>
                                <h3>{component.name}</h3>
                                <div>
                                    {component.components.map((componentText, i) => (
                                        <p key={i}>
                                            {componentText.raw_text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="food-instructions">
                    <h2>Instructions:</h2>
                    {foodById.instructions.map((step, index) => (
                        <div key={index}>
                            <h4>Step {index + 1}</h4>
                            <p>{step.display_text}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </section>
            <section className='details-right'>
                <div className="sticky-right">
                    <div className="food-video">
                        {foodById.original_video_url ? <video controls autoPlay muted
                            src={foodById.original_video_url}></video> : null}
                    </div>
                    <Button onClick={addFoodToFav}> Add to list</Button>
                </div>
            </section>

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div>
    )
}