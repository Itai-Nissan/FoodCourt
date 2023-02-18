import { useState } from 'react';
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { setLoggedInUser } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'



export function Login() {
    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [userPassword, setuserPassword] = useState('')


    function setLogin(e) {
        const actionType = 'login'
        const userToSignup = {
            userName,
            userPassword,
        }

        dispatch(setLoggedInUser(userToSignup, actionType))

        setUserName('')
        setuserPassword('')
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
                    <Button onClick={setLogin}>Login</Button>
                </form>
            </section>
        </div>
    )
}
