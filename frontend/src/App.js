import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { foodService } from './services/food.service'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
import { Login } from './views/Login'
import { Signup } from './views/Signup'
import { UserDetails } from './views/UserDetails'
import { FoodDetails } from './views/FoodDetails'
import { AboutPage } from './views/AboutPage'

function App() {
  // console.clear()

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
            <Route path='/UserDetails/:id' element={<UserDetails />} />
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
