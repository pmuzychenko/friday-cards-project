import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Error404} from "../pages/Error404/Error404";
import {Login} from "../pages/Login/Login";
import {PasswordRecovery} from "../pages/Password-recovery/Password-recovery";
import {Profile} from "../pages/Profile/Profile";
import {SetNewPassword} from "../pages/SetNewPassword/SetNewPassword";
import {SignUp} from "../pages/Sign-up/Sign-up";
import {SuperComponentsStand} from "../pages/SUperComponentsStand/SuperComponentsStand";


export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile: '/profile',
    signUp: '/signUp',
    newPassword: '/newPassword',
    superComponentsStand: '/superComponentsStand',
    error: '/404'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.login}/>}/>
                <Route path={PATH.login} render={() => <Login/>}/>
                <Route exact path={PATH.profile} render={() => <Profile/>}/>
                <Route exact path={PATH.passwordRecovery} render={() => <PasswordRecovery/>}/>
                <Route exact path={PATH.signUp} render={() => <SignUp/>}/>
                <Route path={`${PATH.newPassword}/:resetPasswordToken`} render={() => <SetNewPassword/>}/>
                <Route exact path={PATH.superComponentsStand} render={() => <SuperComponentsStand/>}/>
                <Route path={PATH.error} render={() => <Error404/>}/>
                <Redirect from={'*'} to={PATH.error}/>
            </Switch>
        </div>
    );
}