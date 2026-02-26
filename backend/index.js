import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRouter.js';
import productRouter from './Routes/productRouter.js';
import orderRouter from './Routes/orderRouter.js';

// import bookingRouter from './Routes/bookingRouter.js';
// import uploadRouter from './Routes/uploadRouter.js';

dotenv.config();
const app = express();

const allowedOrigins = [
    "https://agripact-mu.vercel.app",
    "https://agripact-mu.vercel.app/"
];


app.get("/", (req, res) => {
    res.send("Hi I am full stack developer from Biharrr")
})
//Middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb is connected")
} catch (error) {
    console.log(error);
}

//apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);


const port = 3001;

app.listen(port, () => {
    console.log(`App is listening on Port${port}`)
})