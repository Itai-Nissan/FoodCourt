import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { setSignUp } from '../store/actions/userActions'

import { useDispatch, useSelector } from 'react-redux'


export function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const routeToProfile = useCallback((userToSignup) => navigate(`/UserProfile/${userToSignup._id}`, { replace: true }), [navigate])

    const [fullName, setUserFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const [incorrectFullname, setIncorrectFullname] = useState(false)
    const [incorrectFullnameText, setIncorrectFullnameText] = useState('')

    const [incorrectUsername, setIncorrectUsername] = useState(false)
    const [incorrectUsernameText, setIncorrectUsernameText] = useState('')

    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const [incorrectPasswordText, setIncorrectPasswordText] = useState('')

    const [incorrectEmail, setIncorrectEmail] = useState(false)
    const [incorrectEmailText, setIncorrectEmailText] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function validatFullname() {
        if (fullName.includes('$')) {
            setIncorrectFullname(true)
            setIncorrectFullnameText('Please do not use $ sign')
            return false
        }
        if (!fullName) {
            setIncorrectFullname(true)
            setIncorrectFullnameText('Please enter a valid full name')
            return false
        }
    }

    function validatUserName() {
        if (userName.includes('$')) {
            setIncorrectUsername(true)
            setIncorrectUsernameText('Please do not use $ sign')
            setUserFullName('')
            return false
        }
        if (!userName) {
            setIncorrectUsername(true)
            setIncorrectUsernameText('Please enter a valid user name')
            setUserName('')
            return false
        }
    }

    function validatPassword() {
        if (userPassword.includes('$')) {
            setIncorrectPassword(true)
            setIncorrectPasswordText('Please do not use $ sign')
            setuserPassword('')
            return false
        }
        if (!userPassword) {
            setIncorrectPassword(true)
            setIncorrectPasswordText('Please enter a valid user name')
            setuserPassword('')
            return false
        }
    }

    function validatEmail() {
        if (userEmail.includes('$')) {
            setIncorrectEmail(true)
            setIncorrectEmailText('Please do not use $ sign')
            setUserEmail('')
            return false
        }
        if (!userEmail) {
            setIncorrectEmail(true)
            setIncorrectEmailText('Please enter a valid user name')
            setUserEmail('')
            return false
        }
    }

    function setLogin(e) {
        const userToSignup = {
            fullName,
            userName,
            userPassword,
            userEmail
        }
        const checkFullname = validatFullname()
        const checkUserName = validatUserName()
        const checkPassword = validatPassword()
        const checkEmail = validatEmail()
        if (checkFullname === false || checkUserName === false || checkPassword === false || checkEmail === false) return

        return dispatch(setSignUp(userToSignup))
            .then((res) => {
                if (res._id) {
                    routeToProfile(res)
                }
            })
    }

    return (
        <div>
            <section className='login container'>
                <h2>Sign up</h2>
                <form className={incorrectUsername ? 'incorrect' : ''} action="">
                    <div className="input">
                        <div className="input-container">
                            <Input type="text" placeholder='Full name'
                                value={fullName}
                                onChange={(event) => setUserFullName(event.target.value)} />
                            <p className='incorrect'>{incorrectFullname ? incorrectFullnameText : ''}</p>
                            {/* <p className='incorrect'>{incorrectLogin ? 'Please enter a valid user name' : ''}</p> */}

                        </div>
                        <div className="input-container">
                            <Input type="text" placeholder='Username'
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)} />
                            <p className='incorrect'>{incorrectUsername ? incorrectUsernameText : ''}</p>
                            {/* <p className='incorrect'>{incorrectLogin ? incorrectUsernameText : ''}</p> */}
                        </div>
                        <div className="input-container">
                            <Input type="password" placeholder='Password'
                                value={userPassword}
                                onChange={(event) => setuserPassword(event.target.value)} />
                            <p className='incorrect'>{incorrectPassword ? incorrectPasswordText : ''}</p>
                            {/* <p className='incorrect'>{incorrectLogin ? 'Please enter a valid password' : ''}</p> */}
                        </div>
                        <div className="input-container">
                            <Input type="email" placeholder='Email'
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)} />
                            <p className='incorrect'>{incorrectEmail ? incorrectEmailText : ''}</p>
                        </div>
                    </div>
                    <Button onClick={setLogin}>Signup</Button>
                </form>
                <p>Allready have an account? <Link to="/Login">Login</Link></p>
            </section>
        </div>
    )
}
