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
    const [userPassword, setUserPassword] = useState('')

    const [incorrectUsername, setIncorrectUsername] = useState(false)
    const [incorrectPassword, setIncorrectPassword] = useState(false)    
    const [incorrectLogin, setIncorrectLogin] = useState(false)

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
            return dispatch(setLoggedInUser(userToSignup))
                .then((res) => {
                    if (res.code) {
                        const error = res.response.data.err
                        console.log('ein rez', res.response.data.err)
                        if (error == 'Invalid username or password') {
                            console.log('Invalid username or password', error)
                            setIncorrectLogin(true)
                            setUserName('')
                            setUserPassword('')
                        }
                        if (error == 'Invalid username') {
                            console.log('Invalid username', error)
                            setIncorrectUsername(true)
                            setUserName('')
                        }
                        if (error == 'Invalid password') {
                            console.log('Invalid password', error)
                            setIncorrectPassword(true)
                            setUserPassword('')
                        }
                    }
                    if (res._id) {
                        routeToProfile(res)
                    }
                })
        }
    }

    return (
        <div>
            <section className='login container'>
                <h2>Login</h2>
                <form className={incorrectUsername ? 'incorrect' : ''} action="">
                    <section className="input">
                        <div className="input-container">
                            <Input type="text" placeholder='Username'
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)} />
                            <p className='incorrect'>{incorrectUsername ? 'Please enter a valid user name' : ''}</p>
                            <p className='incorrect'>{incorrectLogin ? 'Please enter a valid user name' : ''}</p>
                        </div>
                        <div className="input-container">
                            <Input type="password" placeholder='Password'
                                value={userPassword}
                                onChange={(event) => setUserPassword(event.target.value)}
                                onKeyDown={(event) => { setLogin(event.key) }} />
                            <p className='incorrect'>{incorrectPassword ? 'Please enter a valid password' : ''}</p>
                            <p className='incorrect'>{incorrectLogin ? 'Please enter a valid password' : ''}</p>
                        </div>
                    </section>
                    <Button onClick={setLogin}>Login</Button>
                </form>
                <p>Dont have an account yet? <Link to="/Signup">Sign up</Link></p>
            </section>
        </div>
    )
}
