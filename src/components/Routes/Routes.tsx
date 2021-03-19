import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import styles from './Routes.module.css'
import { Error404 } from "../pages/Error404/Error404";
import { Login } from "../pages/Login/Login";
import { PasswordRecovery } from "../pages/PasswordRecovery/PasswordRecovery";
import { Profile } from "../pages/Profile/Profile";
import { SetNewPassword } from "../pages/SetNewPassword/SetNewPassword";
import { SignUp } from "../pages/SignUp/SignUp";
import {Packs} from "../pages/Packs/Packs";
import { Cards } from "../pages/Cards/Cards";


export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile: '/profile',
    signUp: '/signUp',
    newPassword: '/newPassword',
    error: '/404',
    packs: '/packs',
    cards: '/cards'
}


export const Routes = () => {
    return (
        <div className={styles.currentDisplay}>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.login} />} />
                <Route path={PATH.login} render={() => <Login />} />
                <Route exact path={PATH.signUp} render={() => <SignUp />} />
                <Route exact path={PATH.profile} render={() => <Profile />} />
                <Route exact path={PATH.packs} render={() => <Packs />} />
                <Route exact path={`${PATH.cards}/:id`} render={() => <Cards />} />
                <Route exact path={PATH.passwordRecovery} render={() => <PasswordRecovery />} />
                <Route path={`${PATH.newPassword}/:resetPasswordToken`} render={() => <SetNewPassword />} />
                <Route path={PATH.error} render={() => <Error404 />} />
                <Redirect from={'*'} to={PATH.error} />
            </Switch>
        </div>
    );
}