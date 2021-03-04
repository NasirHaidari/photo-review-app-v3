import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SecureRoutes = (props) => {
  const { currentUser } = useAuth()

  return currentUser ? <Route {...props} /> : <Navigate to='/login' />
}

export default SecureRoutes
