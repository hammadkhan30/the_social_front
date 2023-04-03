import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo_the_social.png';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.name);
    }
    const fetchFriendRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/users/friend_requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFriendRequests(data.friendRequests);
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, []);

  const userInitial = username.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const pendingRequests = friendRequests.filter(request => request.status === 'pending');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/feed">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-friend-requests">
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        {pendingRequests.length > 0 && (
          <span className="friend-request-count">{pendingRequests.length}</span>
        )}
      </div>
      <div className="navbar-user" onClick={toggleDropdown}>
        {userInitial}
        {dropdownVisible && (
          <ul className="navbar-dropdown">
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

