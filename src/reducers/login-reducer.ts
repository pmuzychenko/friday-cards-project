import {Dispatch} from "redux";
import { api, ResponseUserDataType } from "../api/api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

type UserAuthData = {
    data: ResponseUserDataType | null
    isLoggedIn: boolean
}

const initialState: UserAuthData = {
    isLoggedIn: false,
    data: null
}

export const loginReducer = (state: UserAuthData = initialState, action: ActionsType): UserAuthData => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case 'login/SET-USER-DATA': {
            return {...state, data: action.data}
        }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setUserDataAC = (data: ResponseUserDataType) =>
    ({type: 'login/SET-USER-DATA', data} as const)


// thunks
export const loginTC = (data: LoginFormData) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.login(data)
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(res.data))
        })
        .catch((e) => {
            dispatch(setAppStatusAC('failed'))
            const error: string = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppErrorAC('Error: ' + error))
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof setAppErrorAC>


