import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {UserDataType} from "../../../app/login-reducer";
import styles from "./Profile.module.css"

export const Profile = () => {
    const userProfileData = useSelector<AppRootStateType, UserDataType | null>(state => state.login.data)
    return (
        <div className={styles.profile}>
            {userProfileData && <div>User name: {userProfileData.name}</div> }
        </div>
    );
}