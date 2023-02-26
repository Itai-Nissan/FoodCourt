import { useState } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { setLoggedInUser } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'



export function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')

    const routeToProfile = useCallback((userToSignup) => navigate(`/UserProfile/${userToSignup._id}`, { replace: true }), [navigate])
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)


    function setLogin(e) {
        const userToSignup = {
            userName,
            userPassword,
        }

        return dispatch(setLoggedInUser(userToSignup))
            .then((res) => {
                if (!res) {
                    console.log('ein rez');
                }
                if (res) {
                    routeToProfile(res)
                }
                setUserName('')
                setuserPassword('')
            })

    }
    return (
        <div>
            <section className='login'>
                <h2>Login</h2>
                <form action="">
                    <Input type="text" placeholder='Username'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />
                    <Input type="password" placeholder='Password'
                        value={userPassword}
                        onChange={(event) => setuserPassword(event.target.value)} />
                    <Button onClick={setLogin}>Login</Button>
                </form>
                <p>Dont have an account yet? <Link to="/Signup">Sign up</Link></p>
            </section>
        </div>
    )
}
