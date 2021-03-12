import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Login.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../../../reducers/store";
import { RequestStatusType } from "../../../reducers/app-reducer";
import { loginTC } from "../../../reducers/login-reducer";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import { Preloader } from "../../Preloader/Preloader";

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootStateType, string | null>(state => state.appStatus.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appStatus.status)

    if (isUserLoggedIn) {
        return <Redirect to={'/profile'} />
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
        const loginFormData = { email, password, rememberMe }
        dispatch(loginTC(loginFormData))
        setEmail('')
        setPassword('')
    }

    return (
        <div>

            {error && <div className={styles.errorBlock}>{error}</div>}

            <form onSubmit={submitLoginFormData}>

                <div className={styles.formFields}>
                    <input type="text"
                        placeholder={'Enter your email'}
                        value={email}
                        pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"}
                        onChange={emailHandler}
                        className={styles.formFieldsInput}
                    />
                    <input type="password"
                        placeholder={'Enter your password'}
                        value={password}
                        //    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        onChange={passwordHandler}
                        className={styles.formFieldsInput}
                    />
                    <div>
                        <input type="checkbox"
                            checked={rememberMe}
                            onChange={rememberMeHandler}
                            name="checkbox"
                            id="checkbox"
                        />
                        <label htmlFor="checkbox">Remember me</label>
                    </div>
                    <SuperButton type={'submit'} disabled={status === 'loading'}>Submit</SuperButton>
                </div>
                {status === 'loading' && <Preloader />}
            </form>
        </div>
    );
}

