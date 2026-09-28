import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existigUser = await User.findOne({ email });

    if (existigUser) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    if(password.length < 6) {
        return res.status(400).json({ message: "Password must be atleast 6 character." })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        name,
        email,
        password: hashPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none", // strict 
      secure: true, //false
    });

    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json({message: "SignUp Error"})
  }
};

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none", // strict 
            secure: true, //false
        })

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: "SignIn Error" });
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "SingOut Successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "SingOut Error!" });
    }
}
