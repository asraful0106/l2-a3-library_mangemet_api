import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors';

const app = express();

// For getting the application/json data
app.use(express.json());
// For getting the application/x-www-from data
app.use(urlencoded({ extended: true }));
// CORS
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.send("Server is running!!!");
});


export default app;