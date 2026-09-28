import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { userDataContext } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
    
    const {userData} = useContext(userDataContext);

    return (
        <>
        <Routes>
            <Route path="/" element={userData?.name ? <Home /> : <Navigate to={"/signin"} /> } />
            <Route path="/signin" element={!userData?.name ? <SignIn /> : <Navigate to={"/"} /> } />
            <Route path="/signup" element={!userData?.name ? <SignUp /> : <Navigate to={"/"} /> } />
        </Routes>

         <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </>
    );
}

export default App;