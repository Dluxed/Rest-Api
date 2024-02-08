import  express from "express";
import fs from fs;
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

//----Read fake db----//
const readData = () => {
    try {
        const data = fs.readFileSyn();
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSyn("./db.json", JSON.stringify(data));
    }catch (error) {
        console.log(error);
}
};

app.get("/",(req, res) => {
    res.send("Welcome to the taskboard")
});

app.get("/task", (req, res) => {
   const data = readData;
   res.json(data.task);
});
app.get("/task: id", (req, res) => {
    const data = readData();
    const id = parseInt();
    const book = (data.task.find((task) => task.id === id));
 });

//----Write a new task----//
app.post("/task", (req, res) => {
    const data = readData();
    const body = req.body;
    const newTask = {
        id: data.task.lenght + 1,
        ...body,
    };
 });

//----Update tasks----//
app.put("/task/:id",(req,res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.param.id);
    const taskIndex = data.task.findIndex((task) => task.id == id);
    data.task[taskIndex] = {
        ...data.task[taskIndex],
        ...body
    };
    writeData(data);
    res.json({message: "Task updated"});
});

//----Delete tasks---//
app.delete("/task/:id",(req,res) => {
    const data = readData();
    const id = parseInt(req.param.id);
    const taskIndex = data.task.findIndex((task) => task.id == id);
    data.task.splice(taskIndex, 2); //Deletes specific

    writeData(data);
    res.json({message: "Task deleted"});
});

app.listen(3000, () => {
    console.log("Server is listtening port 3000");
});