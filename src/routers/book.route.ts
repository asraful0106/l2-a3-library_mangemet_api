import { Request, Response, Router } from 'express';
import { createNewBook, getAllBooks, getSingleBook } from '../controllers/book.controller';

const bookRouter: Router = Router();

// For getting a single book by book ID
bookRouter.get('/:bookId', async (req: Request, res: Response) => {
    await getSingleBook(req, res);
});

// For Getting All Books
bookRouter.get('/', async (req: Request, res: Response) => {
    await getAllBooks(req, res);
});

// For creating a new Book
bookRouter.post('/', async (req: Request, res: Response) => {
    await createNewBook(req, res);
});

export default bookRouter;