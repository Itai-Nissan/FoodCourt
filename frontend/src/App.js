import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadFoodList, setFilterBy } from '../src/store/actions/foodActions'
// import { loadFoodList, setFilterBy } from '../store/actions/foodActions'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
import { Login } from './views/Login'
import { Signup } from './views/Signup'
import { UserProfile } from './views/UserProfile'
import { FoodDetails } from './views/FoodDetails'
import { AboutPage } from './views/AboutPage'

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
          </Routes>
          <Routes>
            <Route path='/Login' element={<Login />} />
          </Routes>
          <Routes>
            <Route path='/Signup' element={<Signup />} />
          </Routes>
          <Routes>
            <Route path='/UserProfile/:id' element={<UserProfile />} />
          </Routes>
          <Routes>
            <Route path='/FoodDetails/:id' element={<FoodDetails />} />
          </Routes>
          <Routes>
            <Route path='/AboutPage' element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
