import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css'
import Header from '../Header/Header';
import { Routes } from "../Routes/Routes";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';
import { AppRootStateType } from '../../reducers/store';
import { RequestStatusType } from '../../reducers/app-reducer';
import { Preloader } from '../Preloader/Preloader';
import { authMeTC } from '../../reducers/login-reducer';


export const App = () => {
  const dispatch = useDispatch()
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  useEffect(() => {
    dispatch(authMeTC())
}, [])


  if (status === 'loading') {
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
