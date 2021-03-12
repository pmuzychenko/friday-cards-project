import React, {ChangeEvent, useState} from "react";
import style from './../pages/Password-recovery.module.css'
import {
    forgotPasswordErrorAC,
    InitialStatePasswordRecoveryType,
    sentMailTH
} from "../../../app/passwordRecovery-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {useParams} from "react-router-dom";
import {Preloader} from "../preloader/Preloader";

export const PasswordRecovery = () => {
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>()
    const [mail, setMail] = useState('')
    const dispatch = useDispatch()
    const passwordRecovery = useSelector<AppRootStateType, InitialStatePasswordRecoveryType>(state => state.passwordRecovery)


    const changeMailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value)
    }

    const sendMailHandler = () => {
        dispatch(sentMailTH(mail))
    }

    const resetError = () => {
        dispatch(forgotPasswordErrorAC(''))
    }

    return (
        <div className={style.container}>
            Password-recovery page will be here
            {passwordRecovery.isLoading && <Preloader/>}
            {passwordRecovery.isMailSent ?
                <div className={style.sentMailResponse}>click the link in the message in your email
                    <span>{passwordRecovery.info}</span>
                </div> : <div>
                    <div className={style.form}>
                        <input type="text" placeholder='Enter your email' value={mail} onChange={changeMailHandler}
                               onKeyPress={resetError}/>
                        {passwordRecovery.forgotPasswordError !== "" &&
                        <span className={style.message}>{passwordRecovery.forgotPasswordError}</span>
                        }
                        <button onClick={sendMailHandler}>Send</button>
                    </div>

                </div>}


        </div>

    );
}