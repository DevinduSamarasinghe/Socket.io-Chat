import Chats from './pages/Chats';
import './App.css';
import { Button } from '@chakra-ui/react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
    </div>
  );
}

export default App;
