import { IBorrow } from './../interfaces/borrow.interface';
import mongoose, { Schema } from "mongoose";

const borrowScheam = new mongoose.Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref:"Books",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Negative value is not allowed!"]
    },
    dueDate:{
        type: Date,
        required: true
    }
    
});

const Borrow = mongoose.model("Borrow", borrowScheam);

export default Borrow;