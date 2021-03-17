import axios from "axios";
import { LoginFormData } from "../reducers/login-reducer";


const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true
})

const RequestForgetPasswordObject: RequestForgetPasswordType = {
    email: '',
    from: `test-front-admin <ai73a@yandex.by>`,
    message: `<div style="background-color: lime; padding: 15px">password recovery link: 
              <a href='http://localhost:3000/friday-cards-project#/newPassword/$token$'>link</a></div>`
}

//api
export const api = {
    login(data: LoginFormData) {
        return instance.post<ResponseUserDataType>('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me', {})
    },
    authMe(){
        return instance.post('/auth/me', {})
    },
    signUp(email: string, password: string) {
        return instance.post<ResponseSignUpType>(`auth/register`, { email, password })
    },
    forgotPassword(email: string) {
        return instance.post<ResponseForgetPasswordType>(`auth/forgot`, {...RequestForgetPasswordObject, email})
    },
    recoverPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetPasswordResponseType>(`auth/set-new-password`, {
            password,
            resetPasswordToken
        })
    }
}

export const apiPacks = {
    getPacks(page: number = 1, pageCount: number = 8)  {
        return instance.get(`cards/pack?page=${page}&pageCount=${pageCount}`)
    }
}

//types
export type ResponseUserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // packs counter
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean // email confirmation
    rememberMe: boolean
    error?: string
}


type ResponseSignUpType = {
    addedUser: any
    error?: string | null
}

type RequestForgetPasswordType = {
    email: string
    from: string
    message: string
}

type ResponseForgetPasswordType = {
    info: string
    error: string
}

type SetPasswordResponseType = {
    info: string
    error: string
}