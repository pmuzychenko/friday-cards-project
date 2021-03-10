import axios from "axios";


const instance = axios.create({
    baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true
})

//api
export const passwordRecoveryApi = {
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

const RequestForgetPasswordObject: RequestForgetPasswordType = {
    email: '',
    from: `test-front-admin <ai73a@yandex.by>`,
    message: `<div style="background-color: lime; padding: 15px">password recovery link: 
              <a href='http://localhost:3000/friday-cards-project#/newPassword/$token$'>link</a></div>`
}

//types
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

