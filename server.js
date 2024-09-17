import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import { Router } from "express"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const router = Router();

let db

// connect to the database
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

function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}


// global middlewares
app.use(cors())
app.use('/items', router)


// routes
router.get('/', async (req, res) => {
    try {
        const db = getDB()
        const items = await db.collection("items").find().toArray()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const db = getDB()
        const id = new ObjectId(req.params.id)
        const item = await db.collection('items').findOne({ _id: id })

        if (!item) {
            res.status(404).json({ error: 'Item not found' })
        }

        res.status(200).json(item)
    } catch (error) {

    }
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