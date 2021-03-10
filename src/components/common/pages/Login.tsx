import React, {ChangeEvent, FormEvent, useState} from "react";
import SuperButton from "../c2-SuperButton/SuperButton";
import styles from "./Login.module.css"

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [rememberMeValue, setRememberMeValue] = useState<boolean>(false)

    const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.currentTarget.value)
    }

    const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.currentTarget.value)
    }

    const rememberMeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRememberMeValue(event.currentTarget.checked)
    }

    const submitLoginFormData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = emailValue
        const password = passwordValue
        const rememberMe = rememberMeValue
        const loginFormData = {email, password, rememberMe}
        alert(JSON.stringify(loginFormData))
    }

    return (
        <div>
            <form onSubmit={submitLoginFormData}>

                <div className={styles.formFields}>
                    <input type="text"
                           placeholder={'Enter your email'}
                           value={emailValue}
                           onChange={emailHandler}
                    />
                    <input type="password" name={'password'}
                           placeholder={'Enter your password'}
                           value={passwordValue}
                           onChange={passwordHandler}
                    />
                    <div>
                        <input type="checkbox"
                               checked={rememberMeValue}
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

