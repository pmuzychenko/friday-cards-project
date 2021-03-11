import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signInTC } from "../../../app/signIn-reducer";
import { AppRootStateType } from "../../../app/store";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import SuperButton from "../c2-SuperButton/SuperButton";

type SignInValuesType = {
    email: string,
    password: string,
    repeatPassword: string,
}

type ErrorsType = {
    email?: string,
    password?: string,
    repeatPassword?: string,
}

export const SignIn = () => {
    const dispatch = useDispatch()
    const isSignUp = useSelector<AppRootStateType, boolean>((state) => state.registration.isSignUp)

    const [values, setValues] = useState<SignInValuesType>({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [errors, setErrors] = useState<ErrorsType>({})

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, email: e.currentTarget.value })
    }

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, password: e.currentTarget.value })
    }

    const onChangeRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, repeatPassword: e.currentTarget.value })
    }

    const validateEmail = () => {
        if (!values.email) {
            setErrors({ ...errors, email: 'Required' })
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setErrors({ ...errors, email: 'Invalid email address' })
        } else {
            setErrors({ ...errors, email: '' })
        }
    }

    const validatePassword = () => {
        if (!values.password) {
            setErrors({ ...errors, password: 'Required' })
        } else if (values.password.length < 4) {
            setErrors({ ...errors, password: 'The min length of password should be 4' })
        } else {
            setErrors({ ...errors, password: '' })
        }
    }


    const validateRepeatPassword = () => {
        if (!values.repeatPassword) {
            setErrors({ ...errors, repeatPassword: 'Required' })
        } else if (values.password !== values.repeatPassword) {
            setErrors({ ...errors, repeatPassword: 'This password does not match that entered in the password field, please try again' })
        } else {
            setErrors({ ...errors, repeatPassword: '' })
        }
    }

    const handleSubmit = () => {
        if (!values.email) {
            setErrors({ ...errors, email: 'Required' })
        } else if (!values.password) {
            setErrors({ ...errors, password: 'Required' })
        } else if (!values.repeatPassword) {
            setErrors({ ...errors, repeatPassword: 'Required' })
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setErrors({ ...errors, email: 'Invalid email address' })
        } else if (values.password.length < 8) {
            setErrors({ ...errors, password: 'Password must be more than 7 character' })
        } else if (values.password !== values.repeatPassword) {
            setErrors({ ...errors, repeatPassword: 'This password does not match that entered in the password field, please try again' })
        } else {
            dispatch(signInTC(values.email, values.password))
        }
    }

    if (isSignUp) {
        return <Redirect to={'/login'} />
    }

    return (
        <div>
            <h2>REGISTRATION</h2>
            <div>
                <div>
                    <label>Email:</label>
                    <SuperInputText
                        type='text'
                        name='email'
                        placeholder='Enter email'
                        value={values.email}
                        onChange={onChangeEmailHandler}
                        onBlur={validateEmail} />
                </div>
                {errors.email ? <div style={{ color: 'red' }}>{errors.email}</div> : null}
                <div>
                    <label>Password:</label>
                    <SuperInputText
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        value={values.password}
                        onChange={onChangePasswordHandler}
                        onBlur={validatePassword} />
                </div>
                {errors.password ? <div style={{ color: 'red' }}>{errors.password}</div> : null}
                <div>
                    <label>Repeat password:</label>
                    <SuperInputText
                        type='password'
                        name='repeatPassword'
                        placeholder='Repeat password'
                        value={values.repeatPassword}
                        onChange={onChangeRepeatPasswordHandler}
                        onBlur={validateRepeatPassword} />
                </div>
                {errors.repeatPassword ? <div style={{ color: 'red' }}>{errors.repeatPassword}</div> : null}
                <SuperButton
                    onClick={handleSubmit}
                >SIGN UP</SuperButton>
            </div>
        </div>
    );
}