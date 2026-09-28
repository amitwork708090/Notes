import React, { useContext, useState } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`, {email, password},
        {
          withCredentials: true,
        },
      );

      console.log(result.data);

      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log("Signin error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-gray-800 flex flex-col gap-4 borderborder-gray-700 rounded-2xl shadow-xl"
      >
        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Notes</h1>

          <p className="text-sm text-gray-400 mt-2">
            Welcome back! Sign in to continue
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-300">Email</label>

          <input
            type="email"
            name="email"
            spellCheck={false}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-600 bg-gray-900 px-4 py-2.5 rounded-lg outline-none text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition

              [&:-webkit-autofill]:bg-gray-900
              [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#111827_inset]              
            "
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-300">Password</label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-600 bg-gray-900 px-4 py-2.5 rounded-lg outline-none text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            required
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 rounded-lg font-medium text-white transition duration-200"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-600"></div>

          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
            New to Notes?
          </span>

          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Create Account */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="
            w-full
            py-2.5
            rounded-lg
            border
            border-gray-500
            text-gray-200
            font-medium
            hover:bg-gray-700
            hover:border-gray-400
            transition
            duration-200
          "
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignIn;
