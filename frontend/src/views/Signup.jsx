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

    const [fullName, setUserFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [incorrect, setIncorrect] = useState(false)

    const routeToProfile = useCallback((userToSignup) => navigate(`/UserProfile/${userToSignup._id}`, { replace: true }), [navigate])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function setLogin(e) {
        const userToSignup = {
            fullName,
            userName,
            userPassword,
            userEmail
        }

        return dispatch(setSignUp(userToSignup))
            .then((res) => {
                if (!res) {
                    setIncorrect(true)
                }
                if (res) {
                    routeToProfile(res)
                }
                setUserFullName('')
                setUserName('')
                setuserPassword('')
                setuserEmail('')
            })
    }

    return (
        <div>
            <section className='login container'>
                <h2>Sign up</h2>
                <form className={incorrect ? 'incorrect' : ''} action="">
                    <div className="input">
                        <Input type="text" placeholder='Full name'
                            value={fullName}
                            onChange={(event) => setUserFullName(event.target.value)} />
                        <Input type="text" placeholder='Username'
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)} />
                        <Input type="password" placeholder='Password'
                            value={userPassword}
                            onChange={(event) => setuserPassword(event.target.value)} />
                        <Input type="email" placeholder='Email'
                            value={userEmail}
                            onChange={(event) => setuserEmail(event.target.value)} />
                    </div>
                    <p className='incorrect'>{incorrect ? 'Incorrect username or password' : ''}</p>
                    <Button onClick={setLogin}>Signup</Button>
                </form>
                <p>Allready have an account? <Link to="/Login">Login</Link></p>
            </section>
        </div>
    )
}
