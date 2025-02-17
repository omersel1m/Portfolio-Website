const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, updateMessageStatus } = require('../controllers/messageController');
const { protect, admin } = require('../middleware/auth');

router.post('/', sendMessage);
router.get('/', protect, admin, getMessages);
router.put('/:id', protect, admin, updateMessageStatus);

module.exports = router; 