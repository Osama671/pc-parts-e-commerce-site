import { createContext, useEffect, useState } from 'react'
import userService from '../services/user.service.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userService.getUserToken()) {
          const data = await userService.checkToken()
          setUser({
            name: data.user.name,
            email: data.user.email,
          })
        }
        setLoading(false)
      } catch (e) {
        userService.logout()
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await userService.login(email, password)
      console.log(data)
      setUser({
        name: data.user.name,
        email: data.user.email,
      })
      setLoading(false)
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  const logout = () => {
    userService.logout()
    setUser(null)
  }

  const register = async (name, email, password) => {
    try {
      await userService.register(name, email, password)
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
