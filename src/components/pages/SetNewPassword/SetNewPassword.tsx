import React from "react";
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, FormControl, FormGroup, TextField } from "@material-ui/core";

import { changePasswordTC, InitialStateType } from "../../../reducers/set-new-password-reducer";
import { AppRootStateType } from "../../../reducers/store";


type FormikErrorType = {
    password?: string
    repeatPassword?: string
}

export const SetNewPassword = () => {
    const dispatch = useDispatch()
    const newPassword = useSelector<AppRootStateType, InitialStateType>(state => state.newPassword)
    const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>()

    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
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
            dispatch(changePasswordTC(values.password, resetPasswordToken))
            formik.resetForm()
        },
    })

    if (newPassword.passwordIsSet) {
        return <Redirect to={"/login"} />
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
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
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Set new password</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
}