const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },

        // profile:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"UserProfile",
        // },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
