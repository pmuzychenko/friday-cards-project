import React, {ChangeEvent, useState} from "react";
import style from './../pages/Password-recovery.module.css'
import {InitialStatePasswordRecoveryType, sentMailTH} from "../../../app/passwordRecovery-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {useParams} from "react-router-dom";

export const PasswordRecovery = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>()
    debugger
    const [mail, setMail] = useState('')
    const dispatch = useDispatch()
    const passwordRecovery = useSelector<AppRootStateType, InitialStatePasswordRecoveryType>(state => state.passwordRecovery)


    const changeMailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value)
    }

    const sendMailHandler = () => {
        dispatch(sentMailTH(mail))
    }

    return (
        <div className={style.container}>
            Password-recovery page will be here
            <div>
                <input type="text" placeholder='Enter your email' value={mail} onChange={changeMailHandler}/>
                {passwordRecovery.forgotPasswordError !== "" ? <span className={style.message}>{passwordRecovery.forgotPasswordError}</span> : <span>{passwordRecovery.info}</span>}
            </div>
            <button onClick={sendMailHandler}>Send</button>

        </div>
    );
}