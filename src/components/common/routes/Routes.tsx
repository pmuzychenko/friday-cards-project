import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Login} from "../pages/Login";
import {PasswordRecovery} from "../pages/Password-recovery";
import {Profile} from "../pages/Profile";
import {SignIn} from "../pages/Sing-in";
import {NewPasswordEntering} from "../pages/NewPasswordEntering";
import {Error404} from "../pages/Error404";
import {SuperComponentsStand} from "../pages/SuperComponentsStand";


export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile: '/profile',
    singIn: '/singIn',
    newPassword: '/newPassword',
    superComponentsStand: '/superComponentsStand'

}
export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={'/login'}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route exact path={'/passwordRecovery'} render={() => <PasswordRecovery/>}/>
                <Route exact path={'/singIn'} render={() => <SignIn/>}/>
                <Route exact path={'/newPassword'} render={() => <NewPasswordEntering/>}/>
                <Route exact path={'/superComponentsStand'} render={() => <SuperComponentsStand/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    );
}