import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const userRouter = Router();
const users = [];

export default userRouter;

userRouter.post("/signup", async (request, response) => {
    const {email, name, password} = request.body;
    const isAlreadyRegistered = users.some(user => user.email === email);
    if(!email || !name || !password) {
        return response.status(400).json({
            message: "Please, fill in all fields."
        });
    } else if(isAlreadyRegistered) {
        return response.status(400).json({
            message: "User alrealdy registered!"
        });
    } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: encryptedPassword
        };
        users.push(newUser);
        return response.status(201).json({
            message: "User registered successfully!",
            newUser
        });
    }
});