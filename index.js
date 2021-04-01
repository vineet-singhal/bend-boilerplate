import express from 'express';
import { connectToMongoDB } from './src/config';
import { userRoutes } from './src/routes/userRoutes';

const app = express();
const PORT = 4010;
connectToMongoDB();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

userRoutes(app);

app.get("/api/welcome", (req, res) => {
    res.status(200).json({message : "Hi! welcome to our social media API"});
})

app.listen(PORT);