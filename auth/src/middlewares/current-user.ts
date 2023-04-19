import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

//tell typescript that we are augmenting the existing definition of Request
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    //check if jwt is defined on the session object
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
    }

    next();
};