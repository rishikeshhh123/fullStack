const User = require('../models/User');

exports.addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const user = await User.findById(req.user.id);
        const friend = await User.findById(friendId);

        if (!friend || user.friends.includes(friendId)) {
            return res.status(400).json({ msg: 'Cannot add friend' });
        }

        user.friends.push(friendId);
        friend.friends.push(user.id);
        await user.save();
        await friend.save();

        res.json({ msg: 'Friend added' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends');
        let recommended = [];
        user.friends.forEach(friend => {
            friend.friends.forEach(mutual => {
                if (!user.friends.includes(mutual.id) && mutual.id !== user.id) {
                    recommended.push(mutual);
                }
            });
        });
        res.json(recommended);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
