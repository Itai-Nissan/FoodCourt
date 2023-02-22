import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setLoggedInUser } from '../store/actions/userActions'
import { loadUser } from '../store/actions/userActions'

export function AppHeader() {
  const dispatch = useDispatch()


  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  function loggedUserName() {
    if (!loggedInUser || !loggedInUser.userName) return <Link to="/LogIn">Login</Link>
    else if (loggedInUser.userName) {
      return <Link to={`/UserProfile/${loggedInUser._id}`}>{loggedInUser.userName}</Link>
    }
  }

  function logOut() {
    const actionType = 'logout'
    const blankUser = null
    dispatch(setLoggedInUser(blankUser, actionType))
  }

  function isLoggedIn() {
    if (!loggedInUser || !loggedInUser.userName) return <h1>Sign up</h1>
    else if (loggedInUser.userName) return <h1 onClick={logOut}>Logout</h1>
  }

  return (
    <div className='app-header'>

      <section className="header-container container">
        <div className="header-logo">
          <Link to="/"><h1>FoodCourt</h1></Link>
        </div>
        <div className="header-routes">
          <Link to="/">HOME</Link>
          <div>{loggedUserName()}</div>
          <Link to="/Signup">
            <div>{isLoggedIn()}</div>
          </Link>
        </div>
      </section>
    </div>
  )
}
