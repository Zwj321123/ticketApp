import express from 'express';

const router = express.Router();

router.get('/api/users/signin', (req, res) => {
    res.send('You are signed in!');

});

export { router as signinRouter };