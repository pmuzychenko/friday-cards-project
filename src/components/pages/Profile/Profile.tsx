import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Profile.module.css"
import { ResponseUserDataType } from "../../../api/api";
import { AppRootStateType } from "../../../reducers/store";


export const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userProfileData = useSelector<AppRootStateType, ResponseUserDataType | null>(state => state.login.data)

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={styles.profile}>
            {userProfileData && <div className={styles.containerProfile}>
                <span>User name: {userProfileData.name}</span>
                <span>User email: {userProfileData.email}</span>
                <img src={userProfileData.avatar} alt="avatar"/>
            </div>}
        </div>
    );
}