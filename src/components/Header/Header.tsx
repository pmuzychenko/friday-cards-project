import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import styles from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {logoutTC} from "../../reducers/login-reducer";
import {ResponseUserDataType} from "../../api/api";
import {Preloader} from "../Preloader/Preloader";

function Header() {
    const dispatch = useDispatch()
    const userProfileData = useSelector<AppRootStateType, ResponseUserDataType | null>(state => state.login.data)
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)


    const onLogoutClick = () => {
        dispatch(logoutTC())
    }

    if(!isAuth) {
        return <Preloader/>
    }

    if (userProfileData && isUserLoggedIn) {
        return <div className={styles.mainHeader}>
            <nav>
                <NavLink to={PATH.profile}>{'profile'}</NavLink>
                <NavLink to={PATH.signUp}>{'sign-up'}</NavLink>
                <NavLink to={PATH.passwordRecovery}>{'password-recovery'}</NavLink>
                <NavLink to={PATH.newPassword}>{'new-password'}</NavLink>
                <button onClick={onLogoutClick}>logout</button>
            </nav>
        </div>
    }

    return (
        <div className={styles.mainHeader}>
            <nav>
                <NavLink to={PATH.login}>{'login'}</NavLink>
                <NavLink to={PATH.profile}>{'profile'}</NavLink>
                <NavLink to={PATH.signUp}>{'sign-up'}</NavLink>
                <NavLink to={PATH.passwordRecovery}>{'password-recovery'}</NavLink>
                <NavLink to={PATH.newPassword}>{'new-password'}</NavLink>
                <NavLink to={PATH.superComponentsStand}>{'superComponentsStand'}</NavLink>
            </nav>
        </div>
    );
}

export default Header;