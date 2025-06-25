import mongoose from "mongoose";

export interface IBorrow{
    book: mongoose.ObjectId,
    quantity: number,
    dueDate: mongoose.Date
}