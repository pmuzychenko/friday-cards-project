import { Dispatch } from "redux"
import { signInApi } from "../apiSignIn/apiSignIn"

const initialState = {
    isSignUp: false,
    error: ''
}
type InitialStateType = typeof initialState

export const signInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-SIGN-IN': {
            return { ...state, isSignUp: action.value }
        }
        case 'SET-ERROR-SIGN-IN': {
            return { ...state, error: action.error }
        }
        default:
            return state
    }
}

// thunks
export const signInTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    signInApi.signIn(email, password)
        .then(res => {
            console.log(res)
            dispatch(setIsSignInAC(true))
        })
        .catch(error => {
            console.log(error.response.data.error)
            dispatch(setSignInErrorAC(error.response.data.error))
        })
}

// actions
export const setIsSignInAC = (value: boolean) => ({ type: 'SET-IS-SIGN-IN', value } as const)
export const setSignInErrorAC = (error: string) => ({ type: 'SET-ERROR-SIGN-IN', error } as const)

// types
type ActionsType = ReturnType<typeof setIsSignInAC> | ReturnType<typeof setSignInErrorAC>