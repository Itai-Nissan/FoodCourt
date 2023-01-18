import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { foodService } from './services/food.service'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
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
            <Route path='/AboutPage' element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
