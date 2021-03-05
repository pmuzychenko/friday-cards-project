const initialState = {}
type InitialStateType = typeof initialState

export const errorReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}