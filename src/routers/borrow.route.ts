import { Request, Response, Router } from 'express';
import { createBorrow } from '../controllers/borrow.controller';

const borrowRouter: Router = Router();

// For borrow a book
borrowRouter.post('/', async (req: Request, res: Response) => {
    await createBorrow(req, res);
});

export default borrowRouter;