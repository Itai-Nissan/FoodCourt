import React from 'react'
import { Link } from "react-router-dom";


export function AppHeader() {
  return (
    <div className='app-header'>
        <div className="container">
            <h1>AppHeader</h1>
            <Link to="/">HOME</Link>
        </div>
    </div>
  )
}
