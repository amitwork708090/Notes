import React from "react";

function ReadMore({ setReadMore, note }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
            {note.noteTitle}
          </h2>

          <button
            onClick={() => setReadMore(false)}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Note Body */}
        <p className="text-sm sm:text-base text-gray-300 leading-7 whitespace-pre-wrap break-words">
          {note.noteBody}
        </p>

        {/* Close */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setReadMore(false)}
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadMore;