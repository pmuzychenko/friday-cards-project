import { Dispatch } from "redux"
import { api } from "../api/api"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"

const initialState = {
    isSignUp: false,
}
type InitialStateType = {
    isSignUp: boolean
}

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-SIGN-UP': {
            return { ...state, isSignUp: action.value }
        }
        default:
            return state
    }
}

// thunks
export const signUpTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.signUp(email, password)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsSignUpAC(true))
        })
        .catch(error => {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC('Error: ' + error.response.data.error))
        })
}

// actions
export const setIsSignUpAC = (value: boolean) => ({ type: 'SET-IS-SIGN-UP', value } as const)
export const setSignUpErrorAC = (error: string | null) => ({ type: 'SET-ERROR-SIGN-UP', error } as const)

// types
type ActionsType = ReturnType<typeof setIsSignUpAC> | ReturnType<typeof setSignUpErrorAC>