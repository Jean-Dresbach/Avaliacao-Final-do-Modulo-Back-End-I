import express  from "express";
import userRouter from "./users";
import noteRouter from "./notes";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(port, console.log(`Server running!`));