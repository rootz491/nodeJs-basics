const router = require('express').Router();
const { getAllStories, getAllUsers } = require('../services/api');

router.get('/home', (req, res) => {
    res.render('home', { user: req.user });
});

router.get('/users/all', async (_, res) => {
    const users = await getAllUsers();
    res.json({ users });
});

router.get('/stories/all', async (_, res) => {
    const stories = await getAllStories();
    res.json({ stories });
});

module.exports = router;