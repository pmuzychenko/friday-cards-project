import {Dispatch} from "redux";
import {passwordRecoveryApi} from "../apiPasswordRecovery/api-passwordRecovery";

const initialState: InitialStateType = {
    error: '',
    passwordIsSet: false
}

export type InitialStateType = {
    error: string
    passwordIsSet: boolean
}

export const newPasswordEnteringReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-NEW-PASSWORD":
            return {...state, passwordIsSet: action.passwordIsSet}

        case "SET-NEW-PASSWORD-ERROR": {
            debugger
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
export const changePasswordTH = (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    passwordRecoveryApi.recoverPassword(password, resetPasswordToken)
        .then(res => {
            console.log(res.data.info)
            dispatch(setNewPasswordAC(true))
        })
        .catch(error => {
            debugger
            console.log(error.error)
            dispatch(setNewPasswordErrorAC(error.response.data.error))
        })
}

//types
type ActionsType = ReturnType<typeof setNewPasswordAC> | ReturnType<typeof setNewPasswordErrorAC>

