import React, { Component } from 'react';
import {BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './menubar/Navbar'
import Bisection from './pages/Bisection';
import Falseposition from './pages/Falseposition';
import Listnumber from './pages/Listnumber';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Bisection/>}/>
        <Route path='/falseposition' element={<Falseposition/>}/>
        <Route path='/listnumber' element={<Listnumber/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
// class App extends  Component{
//   render(){
//     return (
//       <div className="App">
//       <BrowserRouter>
//         <Navbar/>
//         <Routes>
//           <Route path=' /' element={<Bisection/>}/>
//           <Route path='/falseposition' element={<Falseposition/>}/>
//           <Route path='/listnumber' element={<Listnumber/>}/>
//         </Routes>
//       </BrowserRouter>
//       </div>
//     );
//   }
// }

export default App;
