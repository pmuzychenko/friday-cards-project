import React from "react";
import {useSelector} from "react-redux";
import { ResponseUserDataType } from "../../../api/api";
import { AppRootStateType } from "../../../reducers/store";
import styles from "./Profile.module.css"

export const Profile = () => {
    const userProfileData = useSelector<AppRootStateType, ResponseUserDataType | null>(state => state.login.data)
    return (
        <div className={styles.profile}>
            {userProfileData && <div>User name: {userProfileData.name}</div> }
        </div>
    );
}