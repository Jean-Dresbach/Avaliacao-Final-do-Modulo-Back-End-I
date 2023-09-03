import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { validateRouteNoteCreate } from "./validate"

const noteRouter = Router();
const notes = [];

export default noteRouter;

noteRouter.post("/create", validateRouteNoteCreate, (request, response) => {
    const {title, description, userId} = request.body;
    const newNote = {
        id: uuidv4(),
        title,
        description,
        userId
    }
    notes.push(newNote);
    return response.status(201).json({
        message: "Note created successfully!",
        newNote
    });
});