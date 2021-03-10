import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Login} from "../pages/Login";
import {PasswordRecovery} from "../pages/Password-recovery";
import {Profile} from "../pages/Profile";
import {SignIn} from "../pages/Sing-in";
import {SetNewPassword} from "../pages/SetNewPassword";
import {Error404} from "../pages/Error404";
import {SuperComponentsStand} from "../pages/SuperComponentsStand";


export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile:'/profile',
    singIn:'/singIn',
    newPassword:'/newPassword',
    superComponentsStand:'/superComponentsStand',
    error: '/404'

}
export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.login}/>} />
                <Route path={PATH.login} render={()=> <Login/>}/>
                <Route exact path={PATH.profile} render={()=> <Profile/>}/>
                <Route exact path={PATH.passwordRecovery} render={()=> <PasswordRecovery/>}/>
                <Route exact path={PATH.singIn} render={()=> <SignIn/>}/>
                <Route exact path={PATH.newPassword} render={()=> <SetNewPassword/>}/>
                <Route exact path={PATH.superComponentsStand} render={()=> <SuperComponentsStand/>}/>
                <Route path={PATH.error} render={() => <Error404/>}/>
                <Redirect from={'*'} to={PATH.error}/>
            </Switch>
        </div>
);
}