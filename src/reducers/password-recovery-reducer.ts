import {Dispatch} from "redux";
import { api } from "../api/api";

const initialState = {
    info: "",
    forgotPasswordError: "",
    isMailSent: false,
    isLoading: false
}
export type InitialStatePasswordRecoveryType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStatePasswordRecoveryType = initialState, action: ActionsType): InitialStatePasswordRecoveryType => {
    switch (action.type) {
        case "FORGOT-PASSWORD-RESPONSE":
            return {...state, info: action.info}

        case "SET-FORGOT-PASSWORD-ERROR":
            return {...state, forgotPasswordError: action.forgotPasswordError}

        case 'IS-MAIL-SENT':
            return {...state, isMailSent: action.isMailSent}

        case 'CHANGE-LOADING-STATUS' :
            return {...state, isLoading: action.isLoading}

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

export const isMailSentAC = (isMailSent: boolean) => {
    return ({
        type: 'IS-MAIL-SENT',
        isMailSent
    }) as const
}

export const changeLoadingStatusAC = (isLoading: boolean) => {
    return ({
        type: 'CHANGE-LOADING-STATUS',
        isLoading
    }) as const
}

export const sentMailTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatusAC(true))
    api.forgotPassword(email)
        .then(res => {
            dispatch(ResponseForgotPasswordAC(res.data.info))
            dispatch(isMailSentAC(true))
            dispatch(changeLoadingStatusAC(false))
        })
        .catch(error => {
            dispatch(forgotPasswordErrorAC(error.response.data.error))
            dispatch(isMailSentAC(false))
            dispatch(changeLoadingStatusAC(false))
        })

}

//types
type ActionsType =
    ReturnType<typeof ResponseForgotPasswordAC>
    | ReturnType<typeof forgotPasswordErrorAC>
    | ReturnType<typeof isMailSentAC>
    | ReturnType<typeof changeLoadingStatusAC>