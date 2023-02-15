import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { foodService } from '../services/food.service'
import { Button } from '@mui/material'


export const FoodDetails = (props) => {
    const [foodById, setFood] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadFood()
    }, [params.id])

    async function loadFood() {
        const foodId = params.id
        const getFoodById = await foodService.getById(foodId)
        setFood(getFoodById)
    }


    if (!foodById) return <div>Loading...</div>
    return (
        <div className='food-details'>
            <img className='details-bg' src={foodById.thumbnail_url} alt="" />
            <section className='details-left'>
                <h1>{foodById.name}</h1>
                <br />
                <div className="food-ingredients">
                    <h2>Ingredients</h2>
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
                    <h2>Instructions</h2>
                    {foodById.instructions.map((step, index) => (
                        <div key={index}>
                            <h4>Step {index + 1}</h4>
                            <p>{step.display_text}</p>
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
                    <Button> Add to list</Button>
                </div>
            </section>

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div>
    )
}