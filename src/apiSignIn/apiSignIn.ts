import axios from 'axios'

const instance = axios.create({
    baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true,
})

export const signInApi = {
    signIn(email: string, password: string) {
        return instance.post<ResponseSignInType>(`auth/register`, { email, password })
    }
}

//types
type ResponseSignInType = {
    addedUser: any
    error?: string
}


