import User from "../models/userModel.js";
import {notFound, errorHandler} from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";

//auth user & get the token
//POST api/users/auth
//public
const authUser = async (req, res) => {
const {email, password}=req.body;
const user = await User.findOne({email});
if(user && (await user.matchPassword(password))) {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
    //set jwt as Http cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30*24*60*60*1000  //30days in mill.sec
    })
    res.status(200).json({id: user._id, name: user.name, email: user.email, 
        password: user.password, isAdmin: user.isAdmin})
} else {
    res.status(401).json({message: "Invalid email or password"});
}
}


//register user
//POST api/users/register - we create a new user
//public
const registerUser = async (req, res) => {
    const {name, email, password}=req.body;
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400).json({message: "User already exists."})
    }

    const user = await User.create({name, email, password});

    //create token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
    //set jwt as Http cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30*24*60*60*1000  //30days in mill.sec
    })

    if(user) {
        res.status(201).json({id: user._id, name: user.name, email: user.email, password: user.password});
    } else {
        res.status(400).json({message: "Invalid user data"})
    }
}


//logout user / clear cookie
//POST api/users/logout
//private
const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logged out successfully."});
}

//get 1 user profile
//GET api/users/profile
//public
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        res.status(200).json({_id: user._id, name: user.name, email: user.email, password: user.password})
    } else {
        res.status(404).json({message: 'User not found.'})
    }
}

//update 1 user profile
//PUT api/users/profile   (we do not use the id, because we use token)
//private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name=req.body.name || user.name,
        user.email= req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
    const updatedUser = await user.save();
    res.status(200).json({_id: updatedUser._id, name: updatedUser.name, 
        email: updatedUser.email, isAdmin: updatedUser.isAdmin})
    } else {
        res.status(404).json({message: "User does not exist."})
    }
    
}

//get all users (admin)
//GET api/users 
//Private/admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}

//get user by id (admin)
//GET api/users/:id 
//Private/admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password"); //without password
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: "Not found."})
    }
}

//delete users (admin)
//DELETE api/users/:id
//Privater/admin
const deleteUsers = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.isAdmin) {
            res.status(400).json({message: "Could not delete the admin user."})
        }
        await User.deleteOne({_id: user._id});
        res.status(200).json({message: "User deleted successfully."})
    } else {
        res.status(404).json({message: "User not found."})
    }
}

//update user (admin)
//PUT api/users/:id 
//Private/admin
const updateUser = async (req, res) => {
    const user = await User.findById(rq.params.id);
    if(user) {
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
         user.isAdmin = Boolean(req.body.isAdmin);

         const updatedUser = user.save();
        res.status(200).json({_id: updatedUser._id, 
        name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin})
    } else {
        res.status(404).json({message: "User not found."})
    }   
}

export {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserById, deleteUsers, updateUser}

