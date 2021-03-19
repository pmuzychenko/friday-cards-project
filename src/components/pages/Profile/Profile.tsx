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
            {userProfileData && <div>
                User name: {userProfileData.name} <br />
                User email: {userProfileData.email} <br />
                User avatar: {userProfileData.avatar} <br />
            </div>}
        </div>
    );
}