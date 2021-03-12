import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {PasswordRecovery} from "../pages/Password-recovery/Password-recovery";
import {Profile} from "../pages/Profile/Profile";
import {SignIn} from "../pages/Sign-in/Sing-in";
import {SetNewPassword} from "../pages/SetNewPassword/SetNewPassword";
import {Error404} from "../pages/Error404/Error404";
import {SuperComponentsStand} from "../pages/SUperComponentsStand/SuperComponentsStand";


export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile:'/profile',
    signIn:'/signIn',
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
                <Route exact path={PATH.signIn} render={()=> <SignIn/>}/>
                <Route path={`${PATH.newPassword}:resetPasswordToken`} render={()=> <SetNewPassword/>}/>
                <Route exact path={PATH.superComponentsStand} render={()=> <SuperComponentsStand/>}/>
                <Route path={PATH.error} render={() => <Error404/>}/>
                <Redirect from={'*'} to={PATH.error}/>
            </Switch>
        </div>
);
}