import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {UserDataType} from "../../../app/login-reducer";

export const Profile = () => {
    const userProfileData = useSelector<AppRootStateType, UserDataType | null>(state => state.login.data)
    return (
        <div>
            <div>name: {userProfileData ? userProfileData.name: ''}</div>
        </div>
    );
}