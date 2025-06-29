import { Request, Response } from "express";
import { z } from "zod/v4";
import Borrow from "../models/borrow.model";
import mongoose from "mongoose";
import Books from "../models/book.modle";


// For getting borrowing book detail
const getBorrowBookDetails = async (req: Request, res: Response) => {
    try {
        const borrowSummary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            "success": true,
            "message": "Borrowed books summary retrieved successfully",
            "data": borrowSummary
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "Internal Server Error!",
            "success": false,
            "error": err
        });
    }
}

// For haneling book borrowing 
const createBorrow = async (req: Request, res: Response) => {
    const zBorrow = z.object({
        book: z.string(),
        quantity: z.number(),
        dueDate: z.string()
    });

    try {
        const borrowData = zBorrow.parse(req.body);
        try {
            const book = await Books.findById(new mongoose.Types.ObjectId(borrowData.book));
            if (!book || book.copies < borrowData.quantity) {
                return res.status(400).json({
                    "message": "Not enough Book to borrow.",
                    "success": false,
                    "error": null
                });
            }
            await Borrow.validateCopies(new mongoose.Types.ObjectId(borrowData.book), borrowData.quantity);
            const createBorrow = await Borrow.create(borrowData);
            res.status(201).json({
                "success": true,
                "message": "Book borrowed successfully",
                "data": createBorrow
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                "message": "Internal Server Error!",
                "success": false,
                "error": err
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            "message": "Validation Error",
            "success": false,
            "error": err
        });
    }
}

export { getBorrowBookDetails, createBorrow };