import React from 'react';
import {HashRouter} from 'react-router-dom';
import Header from '../components/common/header/Header';
import {Routes} from "../components/common/routes/Routes";

export const App = () => {
  return (
    <div className="App">
        <HashRouter>
            <Header/>
            <Routes/>
        </HashRouter>
    </div>
  );
}
