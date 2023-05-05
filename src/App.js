import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Shows from './Component/Shows'
import ShowSummary from './Component/ShowSummary'


function App() {
  return (
 <>
<BrowserRouter>
<Routes>
    <Route path='/' element={<Shows/>} />
    <Route path='/show/:id' element={<ShowSummary/>} />
</Routes>
</BrowserRouter>
 </>
  );
}

export default App;
