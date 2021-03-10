import React, {ChangeEvent, useState} from "react";
import style from "./Password-recovery.module.css";
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {changePasswordTH, InitialStateType} from "../../../app/newPasswordEntering-reducer";
import {AppRootStateType} from "../../../app/store";

export const NewPasswordEntering = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>()
    debugger
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const newPassword = useSelector<AppRootStateType, InitialStateType>(state => state.newPassword)
    const dispatch = useDispatch()

    const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

    }
    const changeRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }

    const sendNewPassword = () => {
        if (password === repeatPassword) {
            dispatch(changePasswordTH(password, resetPasswordToken))
        }
    }

    if (newPassword.passwordIsSet) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={style.container}>
            Page with form for new password entering will be here
            <div>
                <input type="text" placeholder='set new password' value={password} onChange={changePasswordHandler}/>
                {newPassword.error !== "" && <span className={style.message}>{newPassword.error}</span>}
            </div>
            <div>
                <input type="text" placeholder='set new password' value={repeatPassword}
                       onChange={changeRepeatPasswordHandler}/>
                {newPassword.error !== "" && <span className={style.message}>{newPassword.error}</span>}
            </div>
            <button onClick={sendNewPassword}>set new password</button>
        </div>
    );
}