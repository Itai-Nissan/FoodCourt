import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { foodService } from '../services/food.service'

export const FoodDetails = (props) => {
    const [foodById, setFood] = useState(null)
    const params = useParams()
    // const navigate = useNavigate()


    useEffect(() => {
        loadFood()
    }, [params.id])


    async function loadFood() {
        const foodId = params.id
        const getFoodById = await foodService.getById(foodId)
        setFood(getFoodById)
        // setFoodVideo(foodById.original_video_url)
    }

    // const onBack = () => {
    //     navigate('/')
    // }



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
                {foodById.original_video_url ? <video controls autoPlay muted
                    src={foodById.original_video_url}></video> : null}
            </section>

            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/food' >Next Food</Link> */}
        </div>
    )
}