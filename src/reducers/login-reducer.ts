import { Dispatch } from "redux";

import { api, ResponseUserDataType } from "../api/api";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

type UserAuthData = {
    data: ResponseUserDataType | null
    isLoggedIn: boolean
    isInitialized: boolean
}

const initialState: UserAuthData = {
    data: null,
    isLoggedIn: false,
    isInitialized: false
}

export const loginReducer = (state: UserAuthData = initialState, action: ActionsType): UserAuthData => {
    switch (action.type) {
        case 'login/SET-USER-DATA': {
            return { ...state, data: action.data }
        }
        case 'login/SET-IS-LOGGED-IN': {
            return { ...state, isLoggedIn: action.value }
        }
        case 'SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setUserDataAC = (data: ResponseUserDataType | null) =>
    ({ type: 'login/SET-USER-DATA', data } as const)

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

export const setAppInitializedAC = (value: boolean) => ({type: 'SET-IS-INITIALIED', value} as const)

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

export const authMeTC = () => (dispatch: Dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    api.authMe()
        .then((res) => {
            if (res.data) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setUserDataAC(res.data))
                dispatch(setIsLoggedInAC(true))
            }
            dispatch(setAppInitializedAC(true));
        })
        .catch((e) => {
            dispatch(setAppStatusAC('failed'))
            const error: string = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppErrorAC('Error: ' + error))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.logout()
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(false))
            dispatch(setUserDataAC(null))
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
    | ReturnType<typeof setAppInitializedAC>
