import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../store/actions/userActions'
import { loadUser } from '../store/actions/userActions'
import { Dropdown } from './Dropdown'
import { TemporaryDrawer } from './Drawer'


export function AppHeader() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
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
  }

  return (
    <div className='app-header'>
      <div className="full-header">
        <section className="header-container container">
          <div className="header-logo">
            <Link to="/"><h1><span>C</span>uttin <span>B</span>oard</h1></Link>
          </div>
          <div className="header-routes">
            <Link to="/">
              <h4>Home</h4>
            </Link>
            <Link to="/ExplorRecipes">
              <h4>Recipes</h4>
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
      <div className="mobile-header">
        <section className="header-container container">
          <div className="header-logo">
            <Link to="/"><h1><span>C</span>uttin <span>B</span>oard</h1></Link>
          </div>
          <TemporaryDrawer
            loggedInUser={loggedInUser}
            isLoggedIn={isLoggedIn}
            loggedUserName={loggedUserName}
          >
          </TemporaryDrawer>
        </section>
      </div>
    </div>
  )
}
