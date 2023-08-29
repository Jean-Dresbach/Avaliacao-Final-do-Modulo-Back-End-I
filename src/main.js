import express  from "express";
import userRouter from "./users";
import messageRouter from "./messages";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/", (request, response) => {
    return response.json({
        message: "Server is up!"
    });
});

app.listen(8080, console.log("Server running in http://localhost:8080"));