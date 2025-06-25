import app from "./app";
import connectToDB from "./database/db";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
    const dbUri = process.env.DATABASE_LINK;
    if (!dbUri) {
        console.log("DATABASE_LINK environment variable is not set.");
        process.exit(1);
    }
    await connectToDB(dbUri);
    app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
}

main();