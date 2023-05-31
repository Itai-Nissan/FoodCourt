import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../src/store/actions/foodActions'
// import { loadFoodList, setFilterBy } from '../store/actions/foodActions'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
import { ExplorRecipes } from './views/ExplorRecipes'
import { Login } from './views/Login'
import { Signup } from './views/Signup'
import { UserProfile } from './views/UserProfile'
import { AddRecipe } from './views/AddRecipe'
import { FoodDetails } from './views/FoodDetails'
import { AboutPage } from './views/AboutPage'
import { EditRecipe } from './views/EditRecipe'

function App() {

  const [recipes, setRecipes] = useState(null)
  const dispatch = useDispatch()
  const stateRecipes = useSelector((state) => state.userModule.loggedInUser)


  useEffect(() => {
    dispatch(loadFoodList())
      .then((updatedRecipes) => {
        setRecipes(updatedRecipes)
      })
  }, [])

  return (
    <Router >
      <div className="app">
        <AppHeader />
        <main className='app-main container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/ExplorRecipes' element={<ExplorRecipes />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/UserProfile/:id' element={<UserProfile />} />
            <Route path='/Add-recipe' element={<AddRecipe />} />
            <Route path='/Edit-recipe/:id' element={<EditRecipe />} />
            <Route path='/FoodDetails/:id' element={<FoodDetails />} />
            <Route path='/AboutPage' element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
