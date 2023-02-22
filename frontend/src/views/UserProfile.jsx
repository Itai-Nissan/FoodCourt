import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const UserProfile = (props) => {

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const userName = loggedInUser.userName
    const userEmail = loggedInUser.userEmail
    let userFav = ''
    if (loggedInUser.userFavorite) userFav = loggedInUser.userFavorite.map((fav, index) => {
        return <div className="" key={index}>
            <h1>{fav.slug}</h1>
        </div>
    })

    return (
        <div className='user-details'>
            <h1>{userName}</h1>
            <h2>{userEmail}</h2>
            <h3>{userFav}</h3>
        </div>
    )
}