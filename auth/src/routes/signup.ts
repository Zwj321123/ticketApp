import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import {BadRequestError} from '@zwjtickets/common';
import {DatabaseConnectionError} from '@zwjtickets/common';
import {User} from "../models/user";
import {validateRequest} from '@zwjtickets/common';

const router = express.Router();

router.post('/api/users/signup', [body('email')
        .isEmail()
        .withMessage("Email must be valid!"),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters!")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    //validateRequest
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use!');
    }

    const user = User.build({ email, password });
    await user.save().catch(err => {
        throw new DatabaseConnectionError();
    });

    // Generate JWT
    const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }
        , process.env.JWT_KEY!
    );

    //store it on session object
    req.session = { jwt: userJwt };

    console.log('Creating a user...');

    // throw new DatabaseConnectionError();
    res.status(201).send(user);

});


export { router as signupRouter };