import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { PATH } from "../Routes/Routes";
import { AppRootStateType } from "../../reducers/store";
import { logoutTC } from "../../reducers/login-reducer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Header() {
    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const [selectedTab, setSelectedTab] = useState('');

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTab(newValue);
    };

    const onLogoutClickHandler = () => {
        dispatch(logoutTC())
    }

    if (isUserLoggedIn) {
        return <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleChange} aria-label="header tabs">
                    <Tab label='profile' value='/profile' component={Link} to={PATH.profile} />
                    <Tab label='logout' onClick={onLogoutClickHandler} />
                </Tabs>
            </AppBar>
        </div>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label='login' value='/login' component={Link} to={PATH.login} />
                    <Tab label='sign up' value='/signUp' component={Link} to={PATH.signUp} />
                </Tabs>
            </AppBar>
        </div>
    );
}

export default Header;