import express from "express";
const router = express.Router(); 

import {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserById, deleteUsers, updateUser} from "../controllers/controllerUser.js"

    router.route("/").post(registerUser).get(getUsers);
    router.route("/auth").post(authUser);
    router.route("/logout").post(logoutUser);
    router.route("/profile").get(getUserProfile).put(updateUserProfile);
    router.route("/:id").get(getUserById).delete(deleteUsers).put(updateUser);



    export default router;