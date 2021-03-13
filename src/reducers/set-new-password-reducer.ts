import {Dispatch} from "redux";
import { api } from "../api/api";

const initialState: InitialStateType = {
    error: '',
    passwordIsSet: false
}

export type InitialStateType = {
    error: string
    passwordIsSet: boolean
}

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-NEW-PASSWORD":
            return {...state, passwordIsSet: action.passwordIsSet}

        case "SET-NEW-PASSWORD-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

//actions
export const setNewPasswordAC = (passwordIsSet: boolean) => ({
    type: 'SET-NEW-PASSWORD',
    passwordIsSet
}) as const

export const setNewPasswordErrorAC = (error: string) => ({
    type: "SET-NEW-PASSWORD-ERROR",
    error
}) as const

//thunks
export const changePasswordTC = (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    api.recoverPassword(password, resetPasswordToken)
        .then(res => {
            dispatch(setNewPasswordAC(true))
        })
        .catch(error => {
            dispatch(setNewPasswordErrorAC(error.response.data.error))
        })
}

//types
type ActionsType = ReturnType<typeof setNewPasswordAC> | ReturnType<typeof setNewPasswordErrorAC>
