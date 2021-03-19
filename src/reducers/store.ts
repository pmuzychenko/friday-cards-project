import { cardsReducer } from './cards-reducer';
import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { loginReducer } from "./login-reducer";
import { passwordRecoveryReducer } from "./password-recovery-reducer";
import { profileReducer } from "./profile-reducer";
import { setNewPasswordReducer } from "./set-new-password-reducer";
import { appReducer } from "./app-reducer";
import { signUpReducer } from "./signUp-reducer";
import { packsReducer } from "./packs-reducer";

const reducers = combineReducers({
    login: loginReducer,
    registration: signUpReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;
console.log(store.getState())