import FactsSearch2 from '../components/FactsSearch2'
import Favoritos from '../components/Favoritos'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const SidebarRoute = () => {
    return (
      <BrowserRouter>
        <div style={{ marginLeft: '-15px', marginRight: '-15px' }}> 
          <Sidebar>
            <Routes>
              <Route path="/" element={<FactsSearch2/>} />
              <Route path="/favorites" element={<Favoritos />} />
              
            </Routes>
          </Sidebar>
        </div>
      </BrowserRouter>
    );
  };
  
  export default SidebarRoute;