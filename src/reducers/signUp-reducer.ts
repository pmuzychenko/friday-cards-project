import { Dispatch } from "redux"
import { api } from "../api/api"

const initialState = {
    isSignUp: false,
    error: null
}
type InitialStateType = {
    isSignUp: boolean
    error: string | null
}

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-SIGN-UP': {
            return { ...state, isSignUp: action.value }
        }
        case 'SET-ERROR-SIGN-UP': {
            return { ...state, error: action.error }
        }
        default:
            return state
    }
}

// thunks
export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    api.signUp(email, password)
        .then(res => {
            // console.log(res)
            dispatch(setIsSignUpAC(true))
        })
        .catch(error => {
            // console.log(error)
            dispatch(setSignUpErrorAC(error.response.data.error))
        })
}

// actions
export const setIsSignUpAC = (value: boolean) => ({ type: 'SET-IS-SIGN-UP', value } as const)
export const setSignUpErrorAC = (error: string | null) => ({ type: 'SET-ERROR-SIGN-UP', error } as const)

// types
type ActionsType = ReturnType<typeof setIsSignUpAC> | ReturnType<typeof setSignUpErrorAC>