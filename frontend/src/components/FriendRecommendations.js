import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/api';

const FriendRecommendations = ({ token }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getRecommendations(token);
                setRecommendations(data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [token]);

    return (
        <div>
            <h3>Friend Recommendations</h3>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((friend) => (
                        <li key={friend._id}>
                            {friend.username}
                            <button>Add Friend</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available.</p>
            )}
        </div>
    );
};

export default FriendRecommendations;
