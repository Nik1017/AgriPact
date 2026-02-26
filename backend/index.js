import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Route Imports
import userRouter from './Routes/userRouter.js';
import productRouter from './Routes/productRouter.js';
import orderRouter from './Routes/orderRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 1. CORS Configuration
// Note: Browsers send Origins WITHOUT trailing slashes. 
const allowedOrigins = [
    "https://agri-pact.vercel.app",
    "https://agripact-mu.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// 2. Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 3. Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB is connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// 4. Routes
app.get("/", (req, res) => {
    res.send("Hi, I am a full stack developer from Bihar!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

// 5. Server Start
app.listen(port, () => {
    console.log(`🚀 App is listening on Port ${port}`);
});