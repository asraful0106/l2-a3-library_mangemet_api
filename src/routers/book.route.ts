import { Request, Response, Router } from 'express';
import { createNewBook, getAllBooks } from '../controllers/book.controller';

const bookRouter: Router = Router();

// For Getting All Books
bookRouter.get('/', async(req: Request, res: Response) =>{
    await getAllBooks(req, res);
})

// For creating a new Book
bookRouter.post('/', async (req: Request, res: Response) => {
    await createNewBook(req, res);
});

export default bookRouter;