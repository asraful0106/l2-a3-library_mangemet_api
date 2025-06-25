import { Request, Response, Router } from 'express';
import { createBorrow, getBorrowBookDetails } from '../controllers/borrow.controller';

const borrowRouter: Router = Router();

// For borrow a book
borrowRouter.get('/', async (req: Request, res: Response) => {
    await getBorrowBookDetails(req, res);
});

// For borrow a book
borrowRouter.post('/', async (req: Request, res: Response) => {
    await createBorrow(req, res);
});

export default borrowRouter;