import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const verfiyToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verfiyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "isAuth Error" });
  }
};

export default isAuth;