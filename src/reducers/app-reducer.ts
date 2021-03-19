
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorType = string | null
export type IsInitializedType = boolean

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ResponseErrorType,
    isInitialized: false as IsInitializedType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'APP/SET-ERROR': {
            return {
                ...state,
                error: action.error
            }
        }
        case 'APP/SET-IS-INITIALIZED': {
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ResponseErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

// types
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppInitializedType = ReturnType<typeof setAppInitializedAC>

type ActionsType = setAppStatusActionType | setAppErrorActionType | setAppInitializedType