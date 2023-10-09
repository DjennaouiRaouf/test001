import './App.css';
import FormPlat from "./forms/FormPlat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import PDFView from "./forms/PDFView";




function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<FormPlat/>} />
                <Route path="/view" element={<PDFView/>} />

            </Routes>
        </Router>


    </div>
  );
}

export default App;
