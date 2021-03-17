import { Dispatch } from "redux";
import { api } from "../api/api";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

const initialState = {
    info: "",
    isMailSent: false,
}
export type InitialStatePasswordRecoveryType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStatePasswordRecoveryType = initialState, action: ActionsType): InitialStatePasswordRecoveryType => {
    switch (action.type) {
        case 'FORGOT-PASSWORD-RESPONSE':
            return { ...state, info: action.info }
        case 'IS-MAIL-SENT':
            return { ...state, isMailSent: action.isMailSent }
        default:
            return state
    }
}

//actions
export const ResponseForgotPasswordAC = (info: string) => ({
    type: 'FORGOT-PASSWORD-RESPONSE',
    info
}) as const

export const isMailSentAC = (isMailSent: boolean) => {
    return ({
        type: 'IS-MAIL-SENT',
        isMailSent
    }) as const
}

export const sentMailTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.forgotPassword(email)
        .then(res => {
            dispatch(ResponseForgotPasswordAC(res.data.info))
            dispatch(isMailSentAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC('Error: ' + error.response.data.error))
            dispatch(isMailSentAC(false))
        })

}

//types
type ActionsType = ReturnType<typeof ResponseForgotPasswordAC> | ReturnType<typeof isMailSentAC>