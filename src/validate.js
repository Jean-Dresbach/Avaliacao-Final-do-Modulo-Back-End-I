import bcrypt from "bcrypt";
import { users } from "./users";

export function validateSignUp(request, response, next) {
    const {email, name, password} = request.body;
    if(!email || !name || !password) {
        return response.status(400).json({
            message: "Please, fill in all fields."
        });
    }
    const isAlreadyRegistered = users.some(user => user.email === email);
    if(isAlreadyRegistered) {
        return response.status(400).json({
            message: "User alrealdy registered!"
        });
    }
    next();
}

export async function validateLogin(request, response, next) {
    const {email, password} = request.body;
    if(!email || !password) {
        return response.status(400).json({
            message: "Please, fill in all fields."
        });
    }
    const user = users.find(user => user.email === email);
    if(!user) {
        return response.status(400).json({
            message: "Invalid email or password."
        });
    }
    const thePasswordsMatch = await bcrypt.compare(password, user.password);
    if(!thePasswordsMatch) {
        return response.status(400).json({
            message: "Invalid email or password."
        });
    }
    next();
}

export function validateUserRequestAndLogin(request, response, next) {
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