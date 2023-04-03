import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateUserInfo.css';

const UpdateUserInfo = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('/users/update_info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, age, gender }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const user = JSON.parse(localStorage.getItem('user'));
      user.name = data.name;
      user.age = data.age;
      user.gender = data.gender;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/feed');
    } else {
      console.error('Error updating user info');
      alert('Error updating user info. Please try again.');
    }
  };
  

  return (
    <div className='container'>
        <div className="update-user-info">
        <h2>Update User Info</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="number" placeholder='Age' id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
            <input type="text" placeholder='Gender' id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <button type="submit">Update</button>
        </form>
        </div>
    </div>
  );
};

export default UpdateUserInfo;
