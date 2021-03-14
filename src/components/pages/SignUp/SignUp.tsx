import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FormControl, FormGroup, TextField, Button } from '@material-ui/core'

import { signUpTC } from "../../../reducers/signUp-reducer";
import { AppRootStateType } from "../../../reducers/store";

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const SignUp = () => {
    const dispatch = useDispatch()
    const isSignUp = useSelector<AppRootStateType, boolean>((state) => state.registration.isSignUp)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
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
                errors.password = 'Password must be more than 7 characters';
            }

            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.password !== values.repeatPassword) {
                errors.repeatPassword = 'Passwords are not equal';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(signUpTC(values.email, values.password))
            formik.resetForm()
        },
    })

    if (isSignUp) {
        return <Redirect to={'/login'} />
    }

    return (
        <div>
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
                        <TextField
                            type="password"
                            label="Repeat password"
                            margin="normal"
                            {...formik.getFieldProps('repeatPassword')}
                        />
                        {
                            formik.touched.repeatPassword && formik.errors.repeatPassword
                                ? <div style={{ color: 'red' }}>{formik.errors.repeatPassword}</div>
                                : null
                        }
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Sign up</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
}