import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { AppRootStateType } from '../../reducers/store'
import { setAppErrorAC } from '../../reducers/app-reducer'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const isOpen = error !== null;

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null));
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}