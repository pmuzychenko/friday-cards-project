import { Dispatch } from "redux";
import { api } from "../api/api";
import { setAppErrorAC } from "./app-reducer";

const initialState: InitialStateType = {
    passwordIsSet: false
}

export type InitialStateType = {
    passwordIsSet: boolean
}

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-NEW-PASSWORD":
            return { ...state, passwordIsSet: action.passwordIsSet }
        default:
            return state
    }
}

//actions
export const setNewPasswordAC = (passwordIsSet: boolean) => ({
    type: 'SET-NEW-PASSWORD',
    passwordIsSet
}) as const

//thunks
export const changePasswordTC = (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    api.recoverPassword(password, resetPasswordToken)
        .then(res => {
            dispatch(setNewPasswordAC(true))
        })
        .catch(error => {
            dispatch(setAppErrorAC('Error: ' + error.response.data.error))
        })
}

//types
type ActionsType = ReturnType<typeof setNewPasswordAC>

