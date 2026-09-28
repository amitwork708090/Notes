import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateNote({ setUpdateForm, note }) {
  const { serverUrl, setUserData } = useContext(userDataContext);

  const [noteTitle, setNoteTitle] = useState(note?.noteTitle || "");
  const [noteBody, setNoteBody] = useState(note?.noteBody || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteBody.trim()) {
      toast.error("Title and body are required!");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.put(
        `${serverUrl}/api/user/updateNote/${note._id}`,
        {
          noteTitle: noteTitle.trim(),
          noteBody: noteBody.trim(),
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      // Update local user state
      setUserData((prev) => ({
        ...prev,
        notes: prev.notes.map((item) =>
          item._id === note._id ? result.data.note : item
        ),
      }));

      // Close modal
      setUpdateForm(false);

      // Success message
      toast.success("Note updated successfully!");
    } catch (error) {
      console.log(
        "Update note error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Failed to update note!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-gray-800
          border border-gray-700
          p-5 sm:p-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Update Note
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Make changes to your note
            </p>
          </div>

          <button
            type="button"
            onClick={() => setUpdateForm(false)}
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-lg
              text-gray-400
              hover:text-white
              hover:bg-gray-700
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1.5">
              Title
            </label>

            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Enter note title"
              className="
                w-full
                px-4 py-3
                rounded-lg
                bg-gray-900
                border border-gray-700
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
                transition
              "
            />
          </div>

          {/* Body */}
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-1.5">
              Note
            </label>

            <textarea
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder="Write your note..."
              rows={7}
              className="
                w-full
                px-4 py-3
                rounded-lg
                bg-gray-900
                border border-gray-700
                text-white
                placeholder:text-gray-500
                outline-none
                resize-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
                transition
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setUpdateForm(false)}
              disabled={loading}
              className="
                w-full sm:w-auto
                px-5 py-2.5
                rounded-lg
                border border-gray-600
                text-gray-300
                hover:bg-gray-700
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-indigo-600
                text-white
                font-medium
                hover:bg-indigo-500
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Updating..." : "Update Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;