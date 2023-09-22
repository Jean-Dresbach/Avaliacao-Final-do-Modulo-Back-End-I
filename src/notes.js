import { Router } from "express"
import { v4 as uuidv4 } from 'uuid'
import { validateRouteNoteCreate, validateRouteListNote, validateRouteNoteUpdate, validateRouteNoteDelete } from "./validateNote"

const noteRouter = Router()
export const notes = []

export default noteRouter

noteRouter.post("/create", validateRouteNoteCreate, (request, response) => {
    const { title, description, userId } = request.body
    const newNote = {
        id: uuidv4(),
        title,
        description,
        userId
    }
    
    notes.push(newNote)
    
    return response.status(201).json({
        message: "Note created successfully!",
        newNote
    })
})

noteRouter.get("/:userId", validateRouteListNote, (request, response) => {
    const page = request.query.page ?? 1
    const per_page = request.query.per_page ?? 5
    const { userId } = request.params
    
    const userNotes = notes.filter(note => note.userId === userId)
    const notesWithinPage = userNotes.slice((page -1) * per_page, page * per_page)
    
    return response.status(200).json({
        info: {
            totalOfNotes: userNotes.length
        },
        data: notesWithinPage
    })
})

noteRouter.put("/:noteId", validateRouteNoteUpdate, (request, response) => {
    const { noteId } = request.params
    const { title, description } = request.body
    const noteIndex = notes.findIndex(note => note.id === noteId)
    
    notes[noteIndex].title = title
    notes[noteIndex].description = description
    
    return response.status(200).json({
        message: "Note updated successfully!"
    })
})

noteRouter.delete("/:noteId", validateRouteNoteDelete, (request, response) => {
    const { noteId } = request.params
    const noteIndex = notes.findIndex(note => note.id === noteId)
    const deletedNote = notes.splice(noteIndex, 1)
    
    return response.status(200).json({
        message: "Note deleted successfully!",
        deletedNote
    })
})