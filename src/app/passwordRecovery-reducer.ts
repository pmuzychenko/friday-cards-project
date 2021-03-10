import {Dispatch} from "redux";
import {passwordRecoveryApi} from "../apiPasswordRecovery/api-passwordRecovery";

const initialState = {
    info: "",
    forgotPasswordError: ""
}
export type InitialStatePasswordRecoveryType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStatePasswordRecoveryType = initialState, action: ActionsType): InitialStatePasswordRecoveryType => {
    switch (action.type) {
        case "FORGOT-PASSWORD-RESPONSE":
            return {...state, info: action.info}

        case "SET-FORGOT-PASSWORD-ERROR":
            return {...state, forgotPasswordError: action.forgotPasswordError}

        default:
            return state
    }
}

//actions
export const ResponseForgotPasswordAC = (info: string) => ({
    type: "FORGOT-PASSWORD-RESPONSE",
    info
}) as const

export const forgotPasswordErrorAC = (forgotPasswordError: string) => ({
    type: 'SET-FORGOT-PASSWORD-ERROR',
    forgotPasswordError
}) as const

export const sentMailTH = (email: string) => (dispatch: Dispatch) => {
    passwordRecoveryApi.forgotPassword(email)
        .then(res => {
            dispatch(ResponseForgotPasswordAC(res.data.info))
        })
        .catch(error => {
            dispatch(forgotPasswordErrorAC(error.response.data.error))
        })
}

//types
type ActionsType = ReturnType<typeof ResponseForgotPasswordAC> | ReturnType<typeof forgotPasswordErrorAC>