import React, { useEffect, useState } from 'react';

const FriendList = ({ token }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/friends', {
                    headers: { Authorization: token },
                });
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [token]);

    const handleUnfriend = async (friendId) => {
        try {
            await fetch(`http://localhost:5000/api/friends/remove/${friendId}`, {
                method: 'DELETE',
                headers: { Authorization: token },
            });
            setFriends(friends.filter(friend => friend._id !== friendId));
        } catch (error) {
            console.error('Error unfriending:', error);
        }
    };

    return (
        <div>
            <h3>Friends List</h3>
            {friends.length > 0 ? (
                <ul>
                    {friends.map((friend) => (
                        <li key={friend._id}>
                            {friend.username}
                            <button onClick={() => handleUnfriend(friend._id)}>Unfriend</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no friends yet.</p>
            )}
        </div>
    );
};

export default FriendList;
