import React from 'react';
import Header from '../Header/Header';
import {Routes} from "../Routes/Routes";
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
