import {Dispatch} from "redux";
import {authAPI} from "./api";

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserDataType = {
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

type UserAuthData = {
    data: UserDataType | null
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

export const setUserDataAC = (data: UserDataType) =>
    ({type: 'login/SET-USER-DATA', data} as const)

// thunks
export const loginTC = (data: LoginFormData) => (dispatch: Dispatch) => {

    authAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(res.data))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('Error: ', {...error})
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserDataAC>