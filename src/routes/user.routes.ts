import express from "express";
import UserController from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.get('/', UserController.listUsers);
userRoute.post('/', UserController.createUser);
userRoute.put('/:userId', UserController.updateUser);
userRoute.delete('/:userId', UserController.deleteUser);

export default userRoute;