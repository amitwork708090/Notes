import User from "../models/user.model.js";

export const getCurrectUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(400).json("User not found");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("GetCurrent User Error in Backend");
  }
};

export const createNote = async (req, res) => {
  try {
    const {noteTitle, noteBody} = req.body;
    
    if(!noteTitle || !noteBody) {
        return res.status(400).json({message: "Note title & body are required"})
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if(!user) {
        return res.status(404).json({message: "User not found 404"});
    }
    
    user.notes.push({
        noteTitle,
        noteBody
    });

    await user.save();

    const newNote = user.notes[user.notes.length - 1];

    return res.status(200).json({message: "Note create successfully.", note: newNote})

  } catch (error) {
    return res.status(500).json({message: "Create note error"});
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({message: "User not found 404"});
    }

    const note = user.notes.id(noteId);

    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }

    note.deleteOne();

    await user.save();

    return res.status(200).json({message: "Note deleted successfully"});

  } catch (error) {
    return res.status(500).json({message: "Delete note error"});
  }
};

export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { noteTitle, noteBody } = req.body;

        if(!noteTitle || !noteBody) {
            return res.status(400).json({message: "Note title and body are required"})
        }

        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message: "user not found 404"})
        }

        const note = user.notes.id(noteId);

        if(!note) {
            return res.status(404).json({message: "note not found 404"})
        }

        note.noteTitle = noteTitle;
        note.noteBody = noteBody;

        await user.save();
        
        return res.status(200).json({message: "Note update successfully", note: note});

    } catch (error) {
        return res.status(500).json({message: "Note update error"});
    }
}

