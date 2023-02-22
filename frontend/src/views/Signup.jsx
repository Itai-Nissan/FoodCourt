import { useState } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { setSignUp } from '../store/actions/userActions'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { utilities } from '../services/utilities';


export function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [fullName, setUserFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [userEmail, setuserEmail] = useState('')

    const routeToProfile = useCallback((userToSignup) => navigate(`/UserProfile/${userToSignup._id}`, { replace: true }), [navigate])

    function setLogin(e) {
        const userToSignup = {
            _id: utilities.randomId(),
            fullName,
            userName,
            userPassword,
            userEmail
        }

        return dispatch(setSignUp(userToSignup))
            .then((res) => {
                if (res) {
                    console.log(res);
                    routeToProfile(userToSignup)
                }
                setUserFullName('')
                setUserName('')
                setuserPassword('')
                setuserEmail('')
            })
        // routeToProfile(userToSignup)
    }

    return (
        <div>
            <section className='login'>
                <form action="">
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
                    <Button onClick={setLogin}>Login</Button>
                </form>
            </section>
        </div>
    )
}
