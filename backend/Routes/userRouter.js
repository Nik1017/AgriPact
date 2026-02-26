import express from 'express';

import isAuthenticate from '../Middlewares/auth.js';
import { getProfile, loginUser, registerUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getProfile", isAuthenticate, getProfile);
// userRouter.get("/logout", logout);

export default userRouter;  