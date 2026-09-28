import express from "express";
import { createNote, deleteNote, getCurrectUser, updateNote } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrectUser);
userRouter.post("/createNote", isAuth, createNote);
userRouter.delete("/deleteNote/:noteId", isAuth, deleteNote);
userRouter.put("/updateNote/:noteId", isAuth, updateNote);

export default userRouter;