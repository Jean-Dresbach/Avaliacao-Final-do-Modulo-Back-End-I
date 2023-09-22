import { Router } from "express"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'
import { validateRouteUserSignUp, validateRouteUserLogin, validateRouteUserLogout } from "./validateUser"

const userRouter = Router()

export const users = []
export default userRouter

userRouter.post("/signup", validateRouteUserSignUp, async (request, response) => {
    const { email, name, password } = request.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: encryptedPassword,
        isLogged: false
    }
    
    users.push(newUser)
    
    return response.status(201).json({
        message: "User registered successfully! Login now to use your notes!",
        newUser
    })
})

userRouter.post("/login", validateRouteUserLogin, (request, response) => {
    const { email } = request.body
    const user = users.find(user => user.email === email)
    
    user.isLogged = true
    
    return response.status(200).json({
        message: "User logged successfully! You can now use your notes!",
        user
    })
})

userRouter.put("/logout/:userId", validateRouteUserLogout, (request, response) => {
    const { userId } = request.params
    const user = users.find(user => user.id === userId)

    user.isLogged = false

    return response.status(200).json({
        message: "User logged out successfully! Please login to use your notes!"
    })
})