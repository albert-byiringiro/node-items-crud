import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import { Router } from "express"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const router = Router();
app.use(cors())
app.use('/items', router)


router.get('/', (req, res) => {
    res.send('Getting all items')
})


app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);

})