import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { validateRouteNoteCreate, validateRouteListNote, validateRouteNoteUpdate } from "./validateNote";

const noteRouter = Router();
export const notes = [];

export default noteRouter;

noteRouter.post("/create", validateRouteNoteCreate, (request, response) => {
    const { title, description, userId } = request.body;
    const newNote = {
        id: uuidv4(),
        title,
        description,
        userId
    }
    notes.push(newNote);
    response.status(201).json({
        message: "Note created successfully!",
        newNote
    });
});

noteRouter.get("/:userId", validateRouteListNote, (request, response) => {
    const { userId } = request.params;
    const userNotes = notes.filter(note => note.userId === userId);
    response.status(200).json({
        userNotes
    });
});

noteRouter.put("/update/:noteId", validateRouteNoteUpdate, (request, response) => {
    const { noteId } = request.params;
    const { title, description } = request.body;
    const noteIndex = notes.findIndex(note => note.id === noteId);
    notes[noteIndex].title = title;
    notes[noteIndex].description = description;
    response.status(200).json({
        message: "Note updated successfully!"
    });
});