import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddUserRecipe } from '../store/actions/userActions'

import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { useInsertionEffect } from 'react'



export const AddRecipe = (props) => {
    const dispatch = useDispatch()


    const [ingredientCount, setIngredientCount] = useState(0)
    const [numberOfIngredients, setNumberOfIngredient] = useState(Array.from(Array(ingredientCount)))
    const [recipeName, setRecipeName] = useState('')
    const [recipeCountry, setRecipeCountry] = useState('')
    const [recipeIngredient, setIngredient] = useState('')
    const [recipeIngredients, setIngredients] = useState('')
    const [recipeSections, setRecipeSections] = useState([{
        components: [
            {
                raw_text: null,
            }
        ],
    }
    ])

    function onAddRecipe() {
        const recipeToAdd = {
            name: recipeName,
            country: recipeCountry,
            section: recipeSections,
        }

        return dispatch(setAddUserRecipe(recipeToAdd))
            .then((res) => {
                if (!res) {
                    console.log('ein rez');
                }
                if (res) {
                    // routeToProfile(res)
                }
                setRecipeName('')
                setRecipeCountry('')
            })
    }

    function removeIngredient(e, index) {
        if (recipeSections[0].components.length === 1) {
            recipeSections[0].components[0].raw_text = null
        } else {
            let updatedSections = recipeSections
            updatedSections[0].components.splice(index, 1)

        }
        const newCount = ingredientCount - 1
        setIngredientCount(newCount)
        setNumberOfIngredient(Array.from(Array(newCount)))

    }

    function addIngredient() {
        let updatedSections = null
        if (recipeSections[0].components[0].raw_text === null) {
            updatedSections = recipeSections
            updatedSections[0].components[0].raw_text = recipeIngredient
        } else {
            updatedSections = recipeSections
            updatedSections[0].components.push({
                raw_text: recipeIngredient,
            })
        }
        setRecipeSections(updatedSections)
        setIngredient('')

        const newCount = ingredientCount + 1
        setIngredientCount(newCount)
        setNumberOfIngredient(Array.from(Array(newCount)))
    }

    function ingredientList(index) {
        if (recipeSections[0].components[0].raw_text === null) return
        return recipeSections[0].components[index].raw_text
    }

    return (
        <div className='add-recipe'>
            <h2>Add new recipe</h2>
            <form action="">
                <Input type="text" placeholder='Name'
                    value={recipeName}
                    onChange={(event) => setRecipeName(event.target.value)} />
                <Input type="text" placeholder='Origin'
                    value={recipeCountry}
                    onChange={(event) => setRecipeCountry(event.target.value)} />
                <section className="add-remove-section">
                    {numberOfIngredients.map((ingredient, index) => {
                        return <div className="add-remove-ingredient" key={index}>
                            <h4>{ingredientList(index)}</h4>
                            <Button onClick={event => removeIngredient(event, index)} key={index}>Remove ingredient</Button>
                        </div>
                    })
                    }
                    <div className="Add-ingredient">
                        <Input type="text" placeholder={recipeIngredient}
                            value={recipeIngredient}
                            onChange={(event) => setIngredient(event.target.value)} />
                        <Button onClick={addIngredient}>Add ingredient</Button>
                    </div>
                </section>
                <Button onClick={onAddRecipe}>Create recipe</Button>
            </form>
        </div>
    )
}
















// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAddUserRecipe } from '../store/actions/userActions'

// import { Input } from '@mui/material'
// import { Button } from '@mui/material'
// import { useInsertionEffect } from 'react'



// export const AddRecipe = (props) => {
//     const dispatch = useDispatch()


//     const [ingredientCount, setIngredientCount] = useState(1)
//     const [numberOfIngredient, setNumberOfIngredient] = useState(Array.from(Array(ingredientCount)))
//     const [recipeName, setRecipeName] = useState('')
//     const [recipeCountry, setRecipeCountry] = useState('')
//     const [recipeIngredient, setIngredient] = useState('')
//     const [recipeIngredients, setIngredients] = useState('')
//     const [recipeSections, setRecipeSections] = useState([{
//         components: [
//             {
//                 raw_text: null,
//             }
//         ],
//     }
//     ])

//     // useEffect(() => {
//     //     // createRecipeSections()
//     //     const updatedSections = [
//     //         {
//     //             components: [
//     //                 {
//     //                     raw_text: '',
//     //                 }
//     //             ],
//     //         }
//     //     ]
//     //     setRecipeSections(updatedSections)
//     // }, [])

//     function createRecipeSections() {
//     }

//     function addNumberOfIngredient() {
//         console.log(numberOfIngredient.length)
//         const newCount = ingredientCount + 1
//         setIngredientCount(newCount)
//         setNumberOfIngredient(Array.from(Array(newCount)))
//     }

//     function onAddRecipe() {
//         const recipeToAdd = {
//             name: recipeName,
//             country: recipeCountry,
//             section: recipeSections,
//         }

//         console.log(recipeToAdd)

//         return dispatch(setAddUserRecipe(recipeToAdd))
//             .then((res) => {
//                 if (!res) {
//                     console.log('ein rez');
//                 }
//                 if (res) {
//                     // routeToProfile(res)
//                 }
//                 setRecipeName('')
//                 setRecipeCountry('')
//             })
//     }

//     function removeIngredient(e, index) {
//         let updatedSections = recipeSections
//         console.log(updatedSections);
//         updatedSections[0].components.splice(index, 1)
//         console.log(updatedSections[0].components);
//         // updatedSections[0].components.pop()

//         const newCount = ingredientCount - 1
//         setIngredientCount(newCount)
//         setNumberOfIngredient(Array.from(Array(newCount)))

//     }

//     function addIngredient() {
//         let updatedSections = null
//         console.log(recipeSections[0].components[0].raw_text);
//         if (recipeSections[0].components[0].raw_text === null) {
//             updatedSections = recipeSections
//             updatedSections[0].components[0].raw_text = recipeIngredient
//             // updatedSections = [
//             //     {
//             //         components: [
//             //             {
//             //                 raw_text: recipeIngredient,
//             //             }
//             //         ],
//             //     }
//             // ]
//         } else {
//             updatedSections = recipeSections
//             updatedSections[0].components.push({
//                 raw_text: recipeIngredient,
//             })
//         }
//         setRecipeSections(updatedSections)
//         setIngredient('')
//         console.log(recipeSections[0].components);

//         const newCount = ingredientCount + 1
//         setIngredientCount(newCount)
//         console.log(newCount);
//         setNumberOfIngredient(Array.from(Array(newCount)))
//         console.log(recipeSections[0].components);
//     }

//     function ingredientList() {
//         // if (recipeSections.length === 0) return
//         // else {
//         for (let i = 0; i < recipeSections[0].components.length; i++) {
//             return recipeSections[0].components[i].raw_text
//         }
//         // return <p> {recipeSections[0].components[0]}</p>
//         // recipeSections[0].components.map((ing) => {
//         //     return <p>{ing.raw_text}</p>
//         // })
//         // }

//         // else {
//         // recipeSections.map((component, index) => (
//         //     <div key={index}>
//         //         <div>
//         //             {component.components.map((componentText, i) => (
//         //                 <p key={i}>
//         //                     {componentText.raw_text}
//         //                 </p>
//         //             ))}
//         //         </div>
//         //     </div>
//         // ))
//         // }

//     }

//     return (
//         <div className='add-recipe'>
//             <h2>Add recipe</h2>
//             <form action="">
//                 <Input type="text" placeholder='Name'
//                     value={recipeName}
//                     onChange={(event) => setRecipeName(event.target.value)} />
//                 <Input type="text" placeholder='Origin'
//                     value={recipeCountry}
//                     onChange={(event) => setRecipeCountry(event.target.value)} />
//                 <section className="add-remove-section">
//                     {numberOfIngredient.map((ingredient, index) => {
//                         return <div className="add-remove-ingredient" key={index}>
//                             <Input type="text" placeholder={recipeSections[0].components[index].raw_text}
//                             // <Input type="text" placeholder={'ing'}
//                                 // value={recipeSections[0].components[index]}
//                                 onChange={(event) => setIngredient(event.target.value)} />
//                             <Button onClick={event => removeIngredient(event, index)} key={index}>Remove ingredient {index + 1}</Button>
//                         </div>
//                     })
//                     }
//                     <div className="remove-ingredient">
//                         <Button onClick={addIngredient}>Add ingredient number {ingredientCount + 1}</Button>
//                     </div>
//                     {/* <Button onClick={() => { addNumberOfIngredient() }}>Add another ingredient</Button> */}
//                 </section>
//                 <Button onClick={onAddRecipe}>Add recipe</Button>
//             </form>
//             {/* <form action="">
//                 <Input type="text" placeholder='Step'
//                     value={recipeIngredient}
//                     onChange={(event) => setIngredient(event.target.value)} />
//                 <Button onClick={addIngredient}>Add step</Button>
//             </form> */}
//         </div>
//     )
// }
