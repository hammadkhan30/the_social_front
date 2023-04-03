import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import FirstPage from './components/pages/firstPage';
import Login from './components/login';
import Feed from './components/feed';
import UpdateUserInfo from './components/UpdateUserInfo';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/update_user_info" element={<UpdateUserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

