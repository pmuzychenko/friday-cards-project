import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Button, IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
        },
    }),
);

const useButtonStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

type ModalPropsType = {
    onClickHandler: (cardID: string) => void
    cardID?: string
    user_id: string
    text: string
    startIcon: any
    color: "inherit" | "disabled" | "primary" | "secondary" | "action" | "error"
}

export default function TransitionsModal(props: ModalPropsType) {
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    const [open, setOpen] = React.useState(false);
    const userId = useSelector<AppRootStateType, string | undefined>(state => state.login.data?._id)

    const {cardID, user_id, text, startIcon, color} = props

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const ClickHandler = () => {
        if (cardID) {
            props.onClickHandler(cardID)
        }
        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleOpen} disabled={userId !== user_id}>
                {startIcon}
            </IconButton>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{text}</h2>
                        <div>
                            <Button onClick={ClickHandler} disabled={userId !== user_id}
                                    startIcon={startIcon}
                                    variant="contained" className={buttonClasses.button}> yes </Button>

                            <Button onClick={handleClose} disabled={userId !== user_id}
                                    startIcon={<HighlightOffIcon color={color}/>}
                                    variant="contained"/>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}