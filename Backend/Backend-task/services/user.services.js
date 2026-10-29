
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const TokenService = require("../jwt/token.service");
const mongoose=require('mongoose');
const UserProfile = require("../models/user.profile.model");

class UserService {
    async signup(name, email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashPassword
        });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return userWithoutPassword;
    }

    async loginUser(email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        }).select("+password");


        if (!user) {
            throw new Error("User not found");
        }
        if(!user.isActive){
            throw new Error('Account is inactive!')
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id: user._id,
            email: user.email,
            isActive: user.isActive
        };

        const token = TokenService.generateToken(payload);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return {
            user: userWithoutPassword,
            token
        };
    }

    async getAllUsers() {
        // const users = await User.find({isActive:true}).populate('profile');
        
        const users=await User.find({isActive:true});
        console.log(users,"User data list");
        const userIds=users.map((user)=>user._id);
        console.log(userIds,'///');
        const userProfiles=await UserProfile.find({
            user:{$in:userIds},
        });

        console.log(userProfiles,"UserProfile data list");

        const userwithprofiles = users.map((user) =>{
            const profile = userProfiles.find(
                (profile) =>profile.user.toString() === user._id.toString(),
            );

        return {
            ...user.toObject(),
            profile:profile||null,
        };
        });
       return userwithprofiles;
    }

    async updateUser(userId, updateData) {
        const allowedUpdates = {};

        if (updateData.name !== undefined) {
            allowedUpdates.name = updateData.name;
        }

        if (updateData.email !== undefined) {
            allowedUpdates.email = updateData.email
                .trim()
                .toLowerCase();
        }

        if (Object.keys(allowedUpdates).length === 0) {
            throw new Error("Name or email is required to update");
        }

        // Check whether another user already has this email
        if (allowedUpdates.email) {
            const existingUser = await User.findOne({
                email: allowedUpdates.email,
                _id: { $ne: userId }
            });

            if (existingUser) {
                throw new Error("Email already exists");
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: allowedUpdates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return {
            message: "User deleted successfully"
        };
    }
    
async addUserProfile(userId, profileData) {
    if (!mongoose.isValidObjectId(userId)) {
        throw new Error("Invalid user ID");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const userProfile = await UserProfile.create({
        user: userId,
        age: profileData.age,
        dob: profileData.dob,
        bio: profileData.bio
    });

    user.profile = userProfile._id;
    await user.save();
    return {
    message: "User profile created successfully",
    data: userProfile
    };
}
}

module.exports = new UserService();
