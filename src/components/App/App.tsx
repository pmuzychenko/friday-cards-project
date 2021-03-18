import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css'
import Header from '../Header/Header';
import { Routes } from "../Routes/Routes";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';
import { AppRootStateType } from '../../reducers/store';
import { Preloader } from '../Preloader/Preloader';
import { authMeTC } from '../../reducers/login-reducer';
import { ResponseUserDataType } from '../../api/api';


export const App = () => {
  const dispatch = useDispatch()
  const userProfileData = useSelector<AppRootStateType, ResponseUserDataType | null>(state => state.login.data)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

  useEffect(() => {
    !userProfileData && dispatch(authMeTC())
  }, [dispatch, userProfileData])


  if (!isInitialized) {
    return <Preloader />
  }

  return (
    <div className="App">
      <Header />
      <ErrorSnackbar />
      <Routes />
    </div>
  );
}
