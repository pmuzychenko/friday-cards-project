import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ResponseUserDataType } from "../../../api/api";

import { AppRootStateType } from "../../../reducers/store";
import styles from "./Profile.module.css"
import {Redirect} from "react-router-dom";
import {authMeTC} from "../../../reducers/login-reducer";
import {RequestStatusType} from "../../../reducers/app-reducer";

export const Profile = () => {
    const dispatch = useDispatch()

    const userProfileData = useSelector<AppRootStateType, ResponseUserDataType | null>(state => state.login.data)
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appStatus.status)

    useEffect(() => {
        !userProfileData && dispatch(authMeTC())
    }, [])

    if (!userProfileData && !isUserLoggedIn && status!=='idle' && status!=='loading') {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={styles.profile}>
            {userProfileData && <div>
                User name: {userProfileData.name}
                User email: {userProfileData.email}
                User avatar: {userProfileData.avatar}
            </div> }
        </div>
    );
}