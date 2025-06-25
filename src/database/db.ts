import mongoose from "mongoose";


async function conntectToDB(dbURL: string) {
    try {
        await mongoose.connect(dbURL);
        console.log("db is connected!!");
    } catch (err) {
        console.log({
            message: "failed to connect with db!!",
            err
        });
        process.exit(1);
    }
}

export default conntectToDB;