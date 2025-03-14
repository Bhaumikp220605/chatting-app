const { hashPassword, comparePassword } = require("../../../common/hash-password");
const { successResponse } = require("../../../helpers/http-response");
const { createToken } = require("../../../middlewares/token");
const User = require("../../../models/user.model");

const addNewUser = async (req, res) => {
    try {
        const { user_email, user_password, user_name } = req.body;
        const existingUser = await User.findOne({ user_email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(user_password);

        const newUser = await User.create({ user_email, user_password: hashedPassword, user_name });

        const token = createToken({ user_email, user_name, id: newUser._id });

        successResponse({ res, message: "User created successfully", token, data: newUser })
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const handleLogIn = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await User.findOne({ user_email });

        if (!user || !(await comparePassword(user_password, user.user_password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = createToken({ id: user._id, user_email: user.user_email, user_name: user.user_name });

        successResponse({ res, message: "Logged in successfully", token, data: user })
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = {
    addNewUser, handleLogIn
}