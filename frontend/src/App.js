import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { foodService } from './services/food.service'

import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'

function App() {

  return (
    <Router >
      <div className="app-main">
        <AppHeader />
        <main className=''>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
