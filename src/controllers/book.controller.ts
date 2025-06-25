import { Request, Response } from "express";
import { z } from 'zod/v4';
import Books from "../models/book.modle";

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
        } catch (err:any) {
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

export { createNewBook };