import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { apiCards } from "../api/api"
import { setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType } from "./app-reducer"
import { AppRootStateType } from "./store"


const initialState = {
    cards: {},
    columns: [
        { id: 1, name: 'Question' },
        { id: 2, name: 'Answer' },
        { id: 3, name: 'Grade' },
        { id: 4, name: 'Updated' }
    ],
    page: 1,
    pageCount: 8,
    cardsTotalCount: 8
}

export type CardType = {
    _id: string
    cardsPack_id: string
    answer: string
    question: string
    grade: number
    updated: string
}

export type ColumnType = {
    id: number
    name: string
}

export type CardsStateType = {
    [key: string]: Array<CardType>
}

type InitialStateType = {
    cards: CardsStateType
    columns: Array<ColumnType>
    page: number
    pageCount: number
    cardsTotalCount: number
}


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARDS': {
            return { ...state, cards: { [action.packID]: action.cards } }
        }
        case 'SET-CARDS-TOTAL-COUNT': {
            return { ...state, cardsTotalCount: action.cardsTotalCount }
        }
        case 'SET-CURRENT-PAGE': {
            return { ...state, page: action.currentPage }
        }
        default:
            return state
    }
}

// thunks
export const getCardsTC = (page: number, pageCount: number, packID: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setCurrentPageAC(page))
        apiCards.getCards(page, pageCount, packID)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setCardsAC(res.data.cards, packID))
                dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Error: ' + error.response.data.error))
            })
    }

export const addCardTC = (packID: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'))
        const { page, pageCount } = getState().cards
        apiCards.addCard(packID)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getCardsTC(page, pageCount, packID))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Error: ' + error.response.data.error))
            })
    }

export const deleteCardTC = (cardID: string, packID: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'))
        const { page, pageCount } = getState().cards
        apiCards.deleteCard(cardID)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getCardsTC(page, pageCount, packID))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Error: ' + error.response.data.error))
            })
    }

export const updateCardTC = (cardID: string, packID: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'))
        const { page, pageCount } = getState().packs
        apiCards.updateCard(cardID)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getCardsTC(page, pageCount, packID))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Error: ' + error.response.data.error))
            })
    }

// actions
export const setCardsAC = (cards: Array<CardType>, packID: string) => ({ type: 'SET-CARDS', cards, packID } as const)
export const setCurrentPageAC = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({ type: 'SET-CARDS-TOTAL-COUNT', cardsTotalCount } as const)

// types
type ActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | setAppStatusActionType
    | setAppErrorActionType