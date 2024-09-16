const express = require('express');
const { addFriend, getRecommendations } = require('../controllers/friendController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', auth, addFriend);
router.get('/recommendations', auth, getRecommendations);

module.exports = router;
