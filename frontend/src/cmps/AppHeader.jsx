import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../store/actions/userActions'
import { loadUser } from '../store/actions/userActions'

import Dropdown from './Dropdown'


import { Filter } from '../cmps/Filter'


export function AppHeader() {
  const dispatch = useDispatch()
  const [recipes, setRecipes] = useState(null)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  function loggedUserName() {
    if (!loggedInUser || !loggedInUser.userName) return <Link to="/LogIn">
      <h4>
        Login
      </h4>
    </Link>
    else if (loggedInUser.userName) {
      return <Dropdown></Dropdown>
    }
  }

  function setLogout() {
    const actionType = 'logout'
    const blankUser = null
    dispatch(logout(blankUser, actionType))
  }

  function isLoggedIn() {
    if (!loggedInUser || !loggedInUser.userName) return <h4>Sign up</h4>
    // else if (loggedInUser.userName) return <h4 onClick={setLogout}>Logout</h4>
  }

  return (
    <div className='app-header'>

      <section className="header-container container">
        <div className="header-logo">
          <Link to="/"><h1><span>C</span>uttin <span>B</span>oard</h1></Link>
        </div>
        <div className="header-routes">
          <Link to="/">
            <h4>Home</h4>
          </Link>
          <div className='logged-user'>
            {loggedUserName()}
          </div>
          <Link to="/Signup">
            <div>{isLoggedIn()}</div>
          </Link>
        </div>
      </section>
    </div>
  )
}
