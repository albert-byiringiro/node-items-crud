import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import { Router } from "express"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const router = Router();

let db

const connectToDatabase = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_DB_URI)
        await client.connect()
        db = client.db()
        console.log("Database connected")
    } catch (error) {
        console.error("Database connection error: ", error);
    }
}



// global middlewares
app.use(cors())
app.use('/items', router)


router.get('/', (req, res) => {
    res.send('Getting all items')
})


connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT: ${PORT}`);

        })
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    })