import mongoose from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookScheam = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        uppercase: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "BIOGRAPHY", "FANTASY"],
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const Books = mongoose.model("Books", bookScheam);
export default Books;