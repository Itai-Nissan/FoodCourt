import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const UserProfile = (props) => {

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const userName = loggedInUser.userName

    return (
        <div className='user-details'>
            <h1>{userName}</h1>
        </div>
    )
}