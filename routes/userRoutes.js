import express from "express";
const router = express.Router(); 

import {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserById, deleteUsers, 
    updateUser} from "../controllers/controllerUser.js";

    import {protect, admin} from "../middlewares/authMiddelare.js"

    router.route("/").post(registerUser).get(protect, admin, getUsers);
    router.route("/auth").post(authUser);
    router.route("/logout").post(logoutUser);
    router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
    router.route("/:id").get(protect, admin, getUserById).delete(protect, admin, deleteUsers).put(protect, admin, updateUser);



    export default router;