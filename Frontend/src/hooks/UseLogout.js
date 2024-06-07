import React from 'react'
import  UseAuthContext  from './UseAuthContext'
const UseLogout = () => {
    const {dispatch} = UseAuthContext()
    const logout=()=>{
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}

export default UseLogout