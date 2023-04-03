import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <ul>
        <li>
          <Link to="/update_user_info">Update User Info</Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
