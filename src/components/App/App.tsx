import React from 'react';
import { useSelector } from 'react-redux';

import './App.css'
import Header from '../Header/Header';
import { Routes } from "../Routes/Routes";
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';
import { AppRootStateType } from '../../reducers/store';
import { RequestStatusType } from '../../reducers/app-reducer';
import { Preloader } from '../Preloader/Preloader';


export const App = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
