import { Router } from "express";
import bcrypt, { compare } from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const userRouter = Router();
export const users = [];

export default userRouter;

userRouter.get("/", (request, response) => {
    return response.json({
        users
    })
})

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
            password: encryptedPassword,
            isLogged: false
        };
        users.push(newUser);
        return response.status(201).json({
            message: "User registered successfully! Login now to use your notes!",
            newUser
        });
    }
});

userRouter.post("/login", async (request, response) => {
    const {email, password} = request.body;
    const user = users.find(user => user.email === email);
    
    if(!email || !password) {
        return response.status(400).json({
            message: "Please, fill in all fields."
        });
    } else if(!user) {
        return response.status(400).json({
            message: "Invalid email or passaword ."
        });
    } else {
        const thePasswordsMatch = await bcrypt.compare(password, user.password);
        if(!thePasswordsMatch) {
            return response.status(400).json({
                message: "Invalid email or passaword."
            });
        } else {
            user.isLogged = true;
            return response.status(200).json({
                message: "User logged successfully! You can now use your notes!",
                user
            });
        }
    } 
});