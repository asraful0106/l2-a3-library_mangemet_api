import { Request, Response } from "express";
import { z } from 'zod/v4';
import Books from "../models/book.modle";


// For getting all books
const getAllBooks = async (req: Request, res: Response) => {
    const zQuery = z.object({
        filter: z.string().optional(),
        sortBy: z.string().optional(),
        sort: z.string().optional(),
        limit: z.string().optional(),
    });

    try {
        const queryData = zQuery.parse(req.query);
        try {
            // For no filtering on data
            if (!queryData.filter && !queryData.sortBy && !queryData.sort && !queryData.limit) {
                const allBook = await Books.find();
                return res.status(200).json({
                    "success": true,
                    "message": "Books retrieved successfully",
                    "data": allBook
                })
            }

            // For filterning the data
            const filteredBook = await Books.find(queryData.filter ? { 'genre': queryData.filter } : {})
                .sort(queryData.sortBy && queryData.sort ? { [queryData.sortBy]: queryData.sort == 'asc' ? 1 : queryData.sort == 'desc' ? -1 : 1 } : {})
                .limit(parseInt(queryData.limit || '0'));
            res.status(200).json({
                "success": true,
                "message": "Books retrieved successfully",
                "data": filteredBook
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                "message": "Internal Server Error!",
                "success": false,
                "error": err
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            "message": "Validation Error",
            "success": false,
            "error": err
        });
    }
}

// For getting a single book by id
const getSingleBook = async (req: Request, res: Response) => {
    const { bookId } = req.params;
    console.log(bookId);
    if (!bookId) {
        return res.status(400).json({
            "message": "Book id is required",
            "success": false,
            "error": "error: Book id can not be empty"
        });
    };
    try {
        const bookData = await Books.findById(bookId);
        if (!bookData) {
            return res.status(404).json({
                "message": "Not found!",
                "success": false,
                "error": "Book id is not exist on the DB"
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": bookData
        });
    } catch (err) {
        return res.status(500).json({
            "message": "Internal Server Error!",
            "success": false,
            "error": err
        });
    }
}

// For creating a new book entry
const createNewBook = async (req: Request, res: Response) => {
    const zBook = z.object({
        title: z.string(),
        author: z.string(),
        genre: z.string(),
        isbn: z.string(),
        description: z.string().optional(),
        copies: z.number(),
        available: z.boolean().optional()
    });


    try {
        const data = zBook.parse(req.body);
        try {
            const newBook = await Books.create(data);
            res.status(201).json({
                "success": true,
                "message": "Book created successfully",
                "data": newBook
            });
        } catch (err: any) {
            console.log(err);
            return res.status(500).json({
                "message": err?.errorResponse?.errmsg || "Internal Server Error!",
                "success": false,
                "error": err
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            "message": "Validation Error",
            "success": false,
            "error": err
        });
    }
}

export { getSingleBook, getAllBooks, createNewBook };