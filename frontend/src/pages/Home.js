import React from 'react';
import SearchBar from '../components/SearchBar';
import FriendList from '../components/FriendList';
import FriendRecommendations from '../components/FriendRecommendations';

const Home = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <h2>Welcome to the Friend App!</h2>
            <SearchBar token={token} />
            <FriendList token={token} />
            <FriendRecommendations token={token} />
        </div>
    );
};

export default Home;
