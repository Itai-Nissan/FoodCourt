import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setLoggedInUser } from '../store/actions/userActions'
import { loadUser } from '../store/actions/userActions'

export function AppHeader() {
  const dispatch = useDispatch()


  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  useEffect(() =>{
      dispatch(loadUser())
  },[])

  function loggedUserName() {
    if (loggedInUser.userName)
      return <Link to={`/UserProfile/${loggedInUser.id}`}>{loggedInUser.userName}</Link>
    else
      return <Link to="/LogIn">Login</Link>
  }

  function logOut() {
    const userToSignup = {
      id: null,
      userName: '',
      userPassword: null,
      userEmail: null
    }

    dispatch(setLoggedInUser(userToSignup))
  }

  function isLoggedIn() {
    if (loggedInUser.userName) return <h1 onClick={logOut}>Logout</h1>
    else return <h1>Sign up</h1>
  }

  return (
    <div className='app-header'>

      <div className="header-container container">
        <Link to="/"><h1>FoodCourt</h1></Link>
        <Link to="/">HOME</Link>
        <div>{loggedUserName()}</div>
        <Link to="/Signup">
          <div>{isLoggedIn()}</div>
        </Link>
      </div>
    </div>
  )
}
