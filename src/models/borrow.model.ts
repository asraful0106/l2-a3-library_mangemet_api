import { IBorrow } from './../interfaces/borrow.interface';
import mongoose, { Model, Schema } from "mongoose";
import Books from './book.modle';

interface borrowModelType extends Model<IBorrow> {
    validateCopies(bookId: mongoose.Types.ObjectId, quantity: number): Promise<void>;
}

const borrowSchema = new mongoose.Schema<IBorrow, borrowModelType>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Negative value is not allowed!"]
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

borrowSchema.static("validateCopies", async function validateCopies(bookId, quantity) {
    const book = await Books.findById(bookId);
    if (!book) {
        throw new Error("Book is not found!");
    }
    if (book.copies < quantity) {
        throw new Error("Not enough copies available.");
    }
    const remainingCopies = book.copies - quantity;
    if (remainingCopies == 0) {
        await Books.findByIdAndUpdate(bookId, { copies: 0, available: false });
    } else {
        await Books.findByIdAndUpdate(bookId, { copies: remainingCopies });
    }
});

const Borrow = mongoose.model<IBorrow, borrowModelType>("Borrow", borrowSchema);

export default Borrow;