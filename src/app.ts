import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors';
import bookRouter from './routers/book.route';

const app = express();

// For getting the application/json data
app.use(express.json());
// For getting the application/x-www-from data
app.use(urlencoded({ extended: true }));
// CORS
app.use(cors());


// For handeling all request for 'api/book'
app.use('/api/books', bookRouter);


export default app;