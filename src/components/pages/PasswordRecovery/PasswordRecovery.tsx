import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, FormControl, FormGroup, TextField } from "@material-ui/core";

import styles from './PasswordRecovery.module.css'
import { AppRootStateType } from "../../../reducers/store";
import { InitialStatePasswordRecoveryType, sentMailTC } from "../../../reducers/password-recovery-reducer";

type FormikErrorType = {
    email?: string
}

export const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const passwordRecovery = useSelector<AppRootStateType, InitialStatePasswordRecoveryType>(state => state.passwordRecovery)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(sentMailTC(values.email))
            formik.resetForm()
        },
    })

    return (
        <div>
            {
                passwordRecovery.isMailSent
                    ? <div className={styles.sentMailResponse}>
                        the recovery link has been sent on your email
                    </div>
                    : <form onSubmit={formik.handleSubmit}>
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
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Send recovery-link</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
            }
        </div>

    );
}