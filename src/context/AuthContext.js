import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/index'
import { CircleLoader } from 'react-spinners'
const AuthContext = createContext()

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)

      setLoading(false)
    })
    return unsubscribe
  }, [])

  const Values = {
    currentUser,
    loading,
    login,
    logout,
    signup,
  }

  return (
    <AuthContext.Provider value={Values}>
      {loading && (
        <div className='d-flex justify-content-center my-5'>
          <CircleLoader color={'#F5A623'} size={100} />
        </div>
      )}
      {!loading && children}
    </AuthContext.Provider>
  )
}

export { AuthContext, useAuth, AuthProvider as default }
