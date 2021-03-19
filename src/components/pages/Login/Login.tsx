import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Button } from '@material-ui/core'

import styles from './Login.module.css'
import { AppRootStateType } from "../../../reducers/store";
import { loginTC } from "../../../reducers/login-reducer";
import { PATH } from "../../Routes/Routes";
import { Preloader } from "../../Preloader/Preloader";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (status === 'loading') {
        return <Preloader />
    }

    if (isUserLoggedIn) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={styles.loginFormContainer}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {
                            formik.touched.email && formik.errors.email
                                ? <div style={{ color: 'red' }}>{formik.errors.email}</div>
                                : null
                        }
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {
                            formik.touched.password && formik.errors.password
                                ? <div style={{ color: 'red' }}>{formik.errors.password}</div>
                                : null
                        }
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                name='rememberMe'
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
            <div className={styles.forgetPasswordContainer}>
                <NavLink to={PATH.passwordRecovery}>{'Forgot password'}</NavLink>
            </div>
        </div>
    );
}

