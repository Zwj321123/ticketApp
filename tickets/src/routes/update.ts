import express, {Request, Response} from 'express';
import { body } from 'express-validator';

import {requireAuth, validateRequest, NotFoundError, NotAuthorizedError} from '@zwjtickets/common';
import {Ticket} from "../models/ticket";

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({gt: 0})
        .withMessage('Price must be provided and must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    //make sure the ticket exists
    if (!ticket) {
        throw new NotFoundError();
    }
    //make sure the ticket belongs to the user
    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    //update the ticket
    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();
    res.send(ticket);
});

export {router as updateTicketRouter};
