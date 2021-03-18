import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { apiPacks } from "../api/api"
import { setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType } from "./app-reducer"
import { AppRootStateType } from "./store"


const initialState = {
    packs: [],
    columns: [
        { id: 1, name: 'Name' },
        { id: 2, name: 'Amount of cards' },
        { id: 3, name: 'Grade' },
        { id: 4, name: 'Date of updates' }
    ],
    page: 1,
    pageCount: 8,
    cardPacksTotalCount: 8
}

export type PackType = {
    _id?: string
    name: string
    cardsCount?: number
    grade?: number
    updated?: string
    private?: boolean
}

export type ColumnType = {
    id: number
    name: string
}

type InitialStateType = {
    packs: Array<PackType>
    columns: Array<ColumnType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-PACKS': {
            return { ...state, packs: action.packs }
        }
        case 'SET-PACKS-TOTAL-COUNT': {
            return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }
        }
        case 'SET-CURRENT-PAGE': {
            return { ...state, page: action.currentPage }
        }
        default:
            return state
    }
}

// thunks
export const getPacksTC = (page: number, pageCount: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setCurrentPageAC(page))
    apiPacks.getPacks(page, pageCount)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setPacksAC(res.data.cardPacks))
            dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
        })
        .catch(error => {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC('Error: ' + error.response.data.error))
        })
}

export const addPackTC = (name: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const { page, pageCount } = getState().packs
    apiPacks.addPack(name)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(getPacksTC(page, pageCount))
        })
        .catch(error => {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC('Error: ' + error.response.data.error))
        })
}

// export const deletePackTC = (): ThunkAction<void, AppRootStateType, unknown, ActionsType> => (dispatch, getState) => {
//     dispatch(setAppStatusAC('loading'))
//     const id = getState().packs.packs
//         apiPacks.deletePack(id)
//             .then(res => {
//                 const { page, pageCount } = getState().packs
//                 dispatch(setAppStatusAC('succeeded'))
//                 dispatch(getPacksTC(page, pageCount))
//             })
//             .catch(error => {
//                 dispatch(setAppStatusAC('failed'))
//                 dispatch(setAppErrorAC('Error: ' + error.response.data.error))
//             })
// }

// actions
export const setPacksAC = (packs: Array<PackType>) => ({ type: 'SET-PACKS', packs } as const)
export const setCurrentPageAC = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({ type: 'SET-PACKS-TOTAL-COUNT', cardPacksTotalCount } as const)

// types
type ActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | setAppStatusActionType
    | setAppErrorActionType