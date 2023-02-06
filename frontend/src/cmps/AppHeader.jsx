import React from 'react'
import { Link } from "react-router-dom";


export function AppHeader() {
  
  return (
    <div className='app-header'>
      <div className="header-container container">
        <Link to="/">
          <h1>FoodCourt</h1>
        </Link>
        <Link to="/">HOME</Link>
      </div>
    </div>
  )
}
