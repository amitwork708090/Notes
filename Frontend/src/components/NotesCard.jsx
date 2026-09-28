import React, { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";
import UpdateNote from "./UpdateNote.jsx";
import { toast } from "react-toastify";
import ReadMore from "./ReadMore.jsx";

function NotesCard({ note }) {
  const { serverUrl, setUserData } = useContext(userDataContext);

  const [updateForm, setUpdateForm] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `${serverUrl}/api/user/deleteNote/${note._id}`,
        { withCredentials: true }
      );

      toast.success("Note delete successfully!")

      setUserData((prev) => ({
        ...prev,
        notes: prev.notes.filter((item) => item._id !== note._id),
      }));
    } catch (error) {
      console.log(
        "Delete note error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full h-[260px] p-5 sm:p-6 border border-gray-700 rounded-xl bg-gray-800 shadow-md flex flex-col transition hover:border-gray-600 hover:shadow-lg">
          {/* Title */}
          <h2
            className="text-lg sm:text-xl font-semibold text-white mb-3 line-clamp-2 break-words">
            {note.noteTitle}
          </h2>

          {/* Body */}
          <p
            className="text-sm sm:text-base text-gray-400 leading-6 line-clamp-5 break-">
            {note.noteBody}
          </p>

          {/* Bottom */}
          <div
            className="mt-auto pt-4 flex items-center justify-between">
            {/* Read More */}
            <button
              onClick={() => setReadMore(true)}
              className="text-sm sm:text-base text-blue-500 hover:text-blue-400 hover:underline transition"
            >
              Read More
            </button>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Update */}
              <div className="relative group">
                <button
                  onClick={() => setUpdateForm(true)}
                  className="text-green-500 hover:text-green-400 transition">
                  <LuPencil className="text-lg sm:text-xl" />
                </button>

                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block text-xs text-white bg-gray-900 px-2 py-1 rounded whitespace-nowrap z-50">
                  Update
                </span>
              </div>

              {/* Delete */}
              <div className="relative group">
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-400 transition">
                  <RiDeleteBin5Line className="text-lg sm:text-xl" />
                </button>

                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block text-xs text-white bg-gray-900 px-2 py-1 rounded whitespace-nowrap z-50">
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Form */}
      {updateForm && (
        <UpdateNote
          setUpdateForm={setUpdateForm}
          note={note}
        />
      )}

      {/* Read More */}
      {readMore && (
        <ReadMore
          setReadMore={setReadMore}
          note={note}
        />
      )}
    </>
  );
}

export default NotesCard;