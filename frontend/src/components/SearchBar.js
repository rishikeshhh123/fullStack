import React, { useState } from 'react';
import { addFriend } from '../services/api';

const SearchBar = ({ token }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/friends/search?username=${searchQuery}`, {
                headers: { Authorization: token },
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            await addFriend(token, friendId);
            alert('Friend request sent!');
        } catch (error) {
            console.error('Add friend error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for users..."
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((user) => (
                        <li key={user._id}>
                            {user.username}
                            <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
