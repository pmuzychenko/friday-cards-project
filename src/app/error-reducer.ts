const initialState = {}

type InitialStateType = typeof initialState

export const errorReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}

type ActionsType = any