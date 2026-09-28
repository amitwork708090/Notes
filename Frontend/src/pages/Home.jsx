import React, { useContext, useState, useEffect, useRef } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import NotesCard from "../components/NotesCard.jsx";
import CreateNote from "../components/CreateNote.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FiUser, FiLogOut, FiPlus, FiFileText, FiChevronDown} from "react-icons/fi";

function Home() {
  const { serverUrl, userData, setUserData } = useContext(userDataContext);

  const [showModal, setShowModal] = useState(false);
  const [sidePanel, setSidePanel] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setSidePanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signout`,{},
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      setUserData(null);
      setSidePanel(false);

      navigate("/signin");
    } catch (error) {
      console.log("Handle logout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* ================= NAVBAR ================= */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
              <FiFileText className="text-lg sm:text-xl" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold">
              Notes
            </h1>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setSidePanel((prev) => !prev)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-800 transition"
            >
              {/* Avatar */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 border-2 border-indigo-300/30 flex items-center justify-center font-semibold transition">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name - hidden on small screens */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">
                  {userData?.name}
                </p>

                <p className="text-xs text-gray-500">
                  Account
                </p>
              </div>

              <FiChevronDown className={`hidden sm:block text-gray-400 transition-transformc ${sidePanel ? "rotate-180" : ""}`}/>
            </button>

            {/* Profile Dropdown */}
            {sidePanel && (
              <div className="absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-2rem)] bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-2 z-50">
                {/* User Information */}
                <div className="px-3 py-3 border-b border-gray-700 mb-2">
                  <div className="flex items-center gap-3">
                    
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
                      {userData?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {userData?.name}
                      </p>

                      <p className="text-xs text-gray-400 truncate">
                        {userData?.email}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Profile */}
                <button
                  onClick={() => setSidePanel(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                >
                  <FiUser />
                  <span>Profile</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

        {/* Welcome */}
        <div className="mb-7 sm:mb-9">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {userData?.name?.split(" ")[0]} 👋
          </h2>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Capture your thoughts and keep your ideas organized.
          </p>
        </div>

        {/* ================= CREATE NOTE ================= */}
        <div
          className="w-full max-w-4xl mx-auto mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-800 border border-gray-700 rounded-xl text-left text-gray-400 hover:border-gray-600 hover:bg-gray-800/80 transition shadow-md"
          >
            <FiPlus
              className="text-indigo-400 text-xl flex-shrink-0"/>

            <span className="text-sm sm:text-base">
              Make a new note...
            </span>
          </button>

          {showModal && (
            <CreateNote setShowModal={setShowModal} />
          )}
        </div>

        {/* ================= NOTES HEADER ================= */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              My Notes
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {userData?.notes?.length || 0}{" "}
              {userData?.notes?.length === 1 ? "note" : "notes"}
            </p>
          </div>
        </div>

        {/* ================= NOTES ================= */}
        {userData?.notes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {userData.notes.map((note) => (
              <NotesCard
                key={note._id}
                note={note}
              />
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="min-h-[280px] border border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center px-5">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
              <FiFileText className="text-2xl text-indigo-400" />
            </div>

            <h3 className="text-lg font-semibold">
              No notes yet
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Start writing down your ideas, tasks, and important thoughts.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-sm font-medium transition"
            >
              <FiPlus />
              Create your first note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;