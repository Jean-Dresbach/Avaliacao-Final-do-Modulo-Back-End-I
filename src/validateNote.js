import { users } from "./users";
import { notes } from "./notes";

export function validateRouteNoteCreate(request, response, next) {
    const { title, description, userId } = request.body;
    if(!title || !description || !userId) {
        return response.status(400).json({
            message: "To create a note, please fill in all fields."
        });
    }
    const user = users.find(user => user.id === userId);
    if(!user) {
        return response.status(404).json({
            message: "User not found."
        });
    }
    if(user.isLogged === false) {
        return response.status(401).json({
            message: "Please log in to access your notes!"
        });
    }
    next();
}

export function validateRouteListNote(request, response, next) {
    const { userId } = request.params;
    const user = users.find(user => user.id === userId);
    if(!user) {
        return response.status(404).json({
            message: "User not found."
        });
    }
    next();
}

export function validateRouteNoteUpdate(request, response, next) {
    const { noteId } = request.params;
    const { title, description } = request.body;
    const note = notes.find(note => note.id === noteId);
    if(!note) {
        return response.status(404).json({
            message: "Note not found."
        });
    }
    if (!title || !description) {
        return response.status(400).json({
            message: "To update a note, please fill in all fields."
        });
    }
    next();
}