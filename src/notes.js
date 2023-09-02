import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { users } from "./users"

const noteRouter = Router();
const notes = [];

export default noteRouter;

function validateRequestAndLogin(request, response, next) {
    const {title, description, userId} = request.body;
    if(!title || !description || !userId) {
        return response.status(400).json({
            message: "To create a note, please fill in all fields."
        });
    }
    const user = users.find(user => user.id === userId);
    if(user.isLogged === false) {
        return response.status(401).json({
            message: "Please log in to access your notes!"
        });
    }
    next();
}

noteRouter.post("/create", validateRequestAndLogin, (request, response) => {
    const {title, description, userId} = request.body;
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
});