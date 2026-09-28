import React, { useContext, useState } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";
import { toast } from "react-toastify";

function CreateNote({ setShowModal }) {
  const { serverUrl, setUserData } = useContext(userDataContext);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteBody.trim()) {
      toast.error("Title and body are required!");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/user/createNote`,
        {
          noteTitle: noteTitle.trim(),
          noteBody: noteBody.trim(),
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      // Add new note to local state
      setUserData((prev) => ({
        ...prev,
        notes: [...(prev.notes || []), result.data.note],
      }));

      // Close modal
      setShowModal(false);

      // Success toast
      toast.success("Note created successfully!");
    } catch (error) {
      console.log(
        "Create note error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Failed to create note!"
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
          bg-gray-800
          border border-gray-700
          rounded-2xl
          p-5 sm:p-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Create Note
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Write down your thoughts
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(false)}
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
                focus:ring-2 focus:ring-indigo-500/20
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
                focus:ring-2 focus:ring-indigo-500/20
                transition
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
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
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;