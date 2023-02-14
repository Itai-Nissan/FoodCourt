import { useState } from 'react';
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { setLoggedInUser } from '../store/actions/userActions'

import { useDispatch, useSelector } from 'react-redux'

export function Signup() {
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [userEmail, setuserEmail] = useState('')

    function setLogin(e) {
        const userToSignup = {
            id: 1,
            userName,
            userPassword,
            userEmail
        }

        dispatch(setLoggedInUser(userToSignup))

        setUserName('')
        setuserPassword('')
        setuserEmail('')
    }

    return (
        <div>
            <section className='login'>
                <form action="">
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
