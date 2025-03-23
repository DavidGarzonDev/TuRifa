import { createContext, useState, useContext} from "react"
import { loginRequest } from "../api/auth.js"


export const AuthContext = createContext()

export const useAuth     = () => {
    const contex = useContext(AuthContext)
    if(!contex){
        throw new Error("No se pudo usar el contexto")
    }
    return contex
    }


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const loginUser = async(user) => {
        const res = await loginRequest(user);
        console.log(res.data)
        setUser(res.data)
    }

    return (
        <AuthContext.Provider value={{
            loginUser,
            user,

        }}>
            {children}
        </AuthContext.Provider>
    )
}
