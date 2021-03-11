import React, {ChangeEvent, FormEvent, useState} from "react";
import SuperButton from "../c2-SuperButton/SuperButton";
import styles from "./Login.module.css"
import {loginTC} from "../../../app/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import { Redirect } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootStateType, string>(state => state.login.error)

    if (isUserLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    const rememberMeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.currentTarget.checked)
    }

    const submitLoginFormData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loginFormData = {email, password, rememberMe}
        dispatch(loginTC(loginFormData))
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={submitLoginFormData}>

                <div className={styles.formFields}>
                    <input type="text"
                           placeholder={'Enter your email'}
                           value={email}
                           onChange={emailHandler}
                    />
                    <input type="password" name={'password'}
                           placeholder={'Enter your password'}
                           value={password}
                           onChange={passwordHandler}
                    />
                    <div>
                        <input type="checkbox"
                               checked={rememberMe}
                               onChange={rememberMeHandler}

                        />
                        <span>Remember me</span>
                    </div>
                    <SuperButton type={'submit'}>Submit</SuperButton>
                </div>

            </form>
        </div>
    );
}

