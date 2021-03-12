import React, {ChangeEvent, useState} from "react";
import style from "./Password-recovery.module.css";
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { changePasswordTC, InitialStateType, setNewPasswordErrorAC } from "../../../reducers/set-new-password-reducer";
import { AppRootStateType } from "../../../reducers/store";


export const SetNewPassword = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>()
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
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
            dispatch(changePasswordTC(password, resetPasswordToken))
        } else {
            setError('Passwords are not equal')
        }
    }

    const resetError = () => {
        setError('')
        dispatch(setNewPasswordErrorAC(''))
    }

    if (newPassword.passwordIsSet) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={style.container}>
            Page with form for new password entering will be here
            <div className={style.message}>{error}</div>
            <div className={style.inputContainer}>
                <input type="text" placeholder='set new password' value={password} onChange={changePasswordHandler}
                       onKeyPress={resetError}/>
                {newPassword.error !== "" && <span className={style.message}>{newPassword.error}</span>}
            </div>
            <div className={style.inputContainer}>
                <input type="text" placeholder='set new password' value={repeatPassword}
                       onChange={changeRepeatPasswordHandler} onKeyPress={resetError}/>
            </div>
            <button onClick={sendNewPassword}>set new password</button>
        </div>
    );
}