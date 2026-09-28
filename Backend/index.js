import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

//DNS Problem fix
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


// Middleware
app.use(
    cors({
        origin: "https://notes-frontend-seven-beta.vercel.app",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    // Connect Database
    connectDB();
});
