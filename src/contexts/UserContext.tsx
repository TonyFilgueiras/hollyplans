/* eslint-disable @typescript-eslint/no-explicit-any */


// import IUser from 'interfaces/IUser'
import React from 'react'
// import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'
import { useNavigate } from 'react-router-dom'

interface UserContextProps {
    children: React.ReactNode
  }
interface UserContextType  {
  loading : boolean
  setLoading: (newState: boolean)=>void
  user: any|undefined
  setUser: (newState: any|undefined)=>void
  error: string
  setError: (newState: string)=>void
  loggedIn: boolean
  setLoggedIn: (newState:boolean)=> void
  userLogout: ()=> void
}
  
const initialValue = {
  loading : true,
  setLoading : ()=>{},
  user: undefined,
  setUser : ()=>{},
  error: '',
  setError : ()=>{},
  loggedIn: false,
  setLoggedIn: () => { },
  userLogout: ()=>{},
}

export const UserContext = React.createContext<UserContextType>(initialValue)

export const UserContextProvider=({children}: UserContextProps)=> {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<any | undefined>()
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  
  const userLogout = React.useCallback(
    async function () {
    setError('')
    setLoading(false)
      setLoggedIn(false)
      setUser(undefined)
    window.sessionStorage.clear()
    navigate("/")
    }, [navigate]
  )
  
  
  // async function getUser(token) {
  //   const{url, options}= USER_GET(token)
  //   const response = await fetch (url, options)
  //     const json = await response.json()
  //     setLoggedIn(true)
  //   }
      
  // async function userLogin(username, password) {
  //   try{
  //   setError('')
  //   setLoading(true)
  //   const{url, options}= TOKEN_POST({username, password})
  //   const tokenRes = await fetch (url, options)
  //   if (!tokenRes.ok) throw new Error (`Error: ${tokenRes.statusText}`)
  //   const {token} = await tokenRes.json()
  //   window.sessionStorage.setItem("token", token)
  //   await getUser(token)
  //   navigate("/conta")
  //   } catch (err) {
  //     setError(err.message)
  //     setLoggedIn(false)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
    
  React.useEffect(() => {
    async function autoLogin() {        
      const storedUserString = window.sessionStorage.getItem("userLogado")
      if (storedUserString) {
        try {          
          const storedUser = JSON.parse(storedUserString)
          setUser(storedUser)
          setLoggedIn(true)
        } catch (err:any) {
          setError(err)
          userLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    autoLogin()
  }, [userLogout])
    
  return (
    <UserContext.Provider value={{ loading, setLoading, user,setUser, error, setError, loggedIn, setLoggedIn, userLogout}}>
      {children}
    </UserContext.Provider>
  )
}
