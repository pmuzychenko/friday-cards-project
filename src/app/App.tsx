import React from 'react';
import Header from '../components/common/header/Header';
import {Routes} from "../components/common/routes/Routes";
import {HashRouter} from "react-router-dom";

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
