import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
    res.send('You are signed out!');

});

export { router as signoutRouter };