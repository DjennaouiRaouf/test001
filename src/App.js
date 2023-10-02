import './App.css';
import FormPlat from "./forms/FormPlat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPlat from "./forms/ListPlat";
import React from "react";




function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<FormPlat/>} />



            </Routes>
        </Router>


    </div>
  );
}

export default App;
