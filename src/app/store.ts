import {applyMiddleware, combineReducers} from "redux";
import {createStore} from "redux";
import thunk from "redux-thunk";
import {errorReducer} from "./error-reducer";
import {loginReducer} from "./login-reducer";
import {newPasswordEnteringReducer} from "./newPasswordEntering-reducer";
import {passwordRecoveryReducer} from "./passwordRecovery-reducer";
import {profileReducer} from "./profile-reducer";
import {signInReducer} from "./signIn-reducer";

const reducers = combineReducers({
    login: loginReducer,
    error: errorReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
    registration: signInReducer,
    newPassword: newPasswordEnteringReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;
console.log(store.getState())