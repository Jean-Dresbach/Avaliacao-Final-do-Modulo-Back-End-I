import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const noteRouter = Router();
const notes = [];

export default noteRouter;

noteRouter.post("/create", (request, response) => {
    const {title, description} = request.body;
    if(!title || !description) {
        return response.status(400).json({
            message: "To create a note, please fill in all fields."
        });
    } else {
        const newNote = {
            id: uuidv4(),
            title,
            description
        }
        notes.push(newNote);

        return response.status(201).json({
            message: "Note created successfully!",
            newNote
        });
    }
});