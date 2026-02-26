import { userModel } from "../Models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// Register User
export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "All Fields are required!!"
            })
        }

        const ExistUser = await userModel.findOne({
            email: email
        })

        if (ExistUser) {
            return res.status(400).json({
                message: "User already exist with this mail"
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPass,
            role,
        })

        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            }
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error in register" })
    }
}

//Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required for login"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        //if not match
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            message: "User Successfully Login",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        })

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error in Login user" })
    }
}

// export const logout = (req, res) => {
//     res.cookie('token', '').json(true);
// };

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(402).json({
                message: "Something went error in getting profile"
            })
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in getting profile info",
            error: error.message
        })
    }
}
