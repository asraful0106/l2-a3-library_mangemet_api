import { Request, Response, Router } from 'express';
import { createNewBook } from '../controllers/book.controller';

const bookRouter: Router = Router();

// For creating a new Book
bookRouter.post('/', async (req: Request, res: Response) => {
    await createNewBook(req, res);
});

export default bookRouter;