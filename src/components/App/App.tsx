import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css'
import Header from '../Header/Header';
import { Routes } from "../Routes/Routes";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';
import { AppRootStateType } from '../../reducers/store';
import { Preloader } from '../Preloader/Preloader';
import { authMeTC } from '../../reducers/login-reducer';


export const App = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authMeTC())
}, [dispatch])


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
