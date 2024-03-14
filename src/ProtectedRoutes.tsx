import React from 'react'
import { Navigate} from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

type Props = {
  children: React.ReactElement
}

export default function ProtectedRoutes({children}:Props) {
    const { loggedIn } = React.useContext(UserContext)



  return loggedIn ? children : <Navigate to="/" />
}