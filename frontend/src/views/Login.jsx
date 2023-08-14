import { useState, useCallback, useEffect } from 'react'
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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    function setLogin(key) {
        if (key === 'Enter' || key.type === 'click') {

            const userToSignup = {
                userName,
                userPassword,
            }
            console.log('hi');

            return dispatch(setLoggedInUser(userToSignup))
                .then((res) => {
                    if (!res) {
                        console.log('ein rez')
                    }
                    if (res) {
                        routeToProfile(res)
                    }
                    setUserName('')
                    setuserPassword('')
                })
        }
    }

    return (
        <div>
            <section className='login container'>
                <h2>Login</h2>
                <form action="">
                    <Input type="text" placeholder='Username'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />
                    <Input type="password" placeholder='Password'
                        value={userPassword}
                        onChange={(event) => setuserPassword(event.target.value)}
                        onKeyDown={(event) => { setLogin(event.key) }} />
                    <Button onClick={setLogin}>Login</Button>
                </form>
                <p>Dont have an account yet? <Link to="/Signup">Sign up</Link></p>
            </section>
        </div>
    )
}
