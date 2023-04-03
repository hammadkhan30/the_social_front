import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import api from '../services/api';
import './feed.css';

const Feed = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = 'current_user_id';
  const username = 'John Doe';

  const posts = [
    {
      id: 1,
      author: 'hammad',
      content: 'The weather is good.',
    },
    {
      id: 2,
      author: 'nabeel',
      content: 'The weather is bad.',
    },
    {
      id: 3,
      author: 'return of hammad',
      content: 'The weather is average.',
    },
  ];

  const handleLike = (postId) => {
    console.log(`Post ${postId} liked.`);
  };

  const handleComment = (postId) => {
    console.log(`Comment on post ${postId}.`);
  };

  const handleSearch = async () => {
    if (search.trim() === '') return;

    setIsLoading(true);
    try {
      const response = await api.get('/search/search_users', {
        params: { name: search },
      });

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        console.error('Search failed:', response.data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    setIsLoading(false);
  };

  const handleSendRequest = async (recipientId) => {
    try {
      const response = await api.post('/users/send_friend_request', { recipientId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      if (response.status === 200) {
        console.log('Request sent successfully:', response.data);
      } else {
        console.error('Request sending failed:', response.data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
};

  

  useEffect(() => {
    if (search === '') setSearchResults([]);
  }, [search]);

  return (
    <div>
      <Navbar username={username} />
      <div className="feed-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for people"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {isLoading ? (
        <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="search-results">
            <h3>Search Results:</h3>
            {searchResults.map((user) => (
            <div key={user.id} className="search-result">
              <span className="search-result-name">{user.name}</span>
              <button onClick={() => handleSendRequest(user._id)}>
                Send Request
              </button>
            </div>
          ))}
        </div>
        ) : null}
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h4>{post.author}</h4>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>Like</button>
                <button onClick={() => handleComment(post.id)}>Comment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;



