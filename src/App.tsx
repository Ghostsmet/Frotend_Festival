import React from 'react';
import './App.css';  
import Header from './Header/Header';  
import Main from './Main/Main'; 
import AboutUs from './AboutUs/AboutUs';
import Slider from './AboutUs/Slider';

function App() {
  return (
    <div className="App">
      <Header />    
      <Main />       
      <AboutUs/>
      
    </div>
  );
}

export default App;



