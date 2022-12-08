import { Request, Response, NextFunction } from 'express';
import Manager from '../../../domain/manager/manager';
import Guest from '../../../domain/manager/guest';

//It's a stub for the authentication middleware
//For the test task it's just takes userId from the jwt token
// for example in the token asd123.432.tredw the user id is a 432
export interface CustomRequest extends Request {
    userId: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        (req as CustomRequest).userId = token.split('.')[1];
    } catch (err) {
        return res.status(401).send('Invalid Bearer Token');
    }

    return next();
};
