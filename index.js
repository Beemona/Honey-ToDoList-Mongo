import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { ExpressValidator } from "express-validator";
import dotenv from "dotenv";


dotenv.config(); 

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




const todoSchema = new mongoose.Schema({
  todoTask: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/casual", async (req, res) => {
    try {
      const todos = await Todo.find(); 
      res.render("casual.ejs", {
        data: todos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post("/casual", async (req, res) => {
    const inputTodoTask = req.body.todoTask;
  
    try {
      await Todo.create({ todoTask: inputTodoTask });
      res.redirect("/casual"); // Redirect to the casual route
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

const todowSchema = new mongoose.Schema({
    todowTask: String,
});
  
const Todow = mongoose.model('Todow', todowSchema);
  
app.get("/work", async (req, res) => {
    try {
      const todows = await Todow.find();
      res.render("work.ejs", {
        data: todows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
  
app.post("/work", async (req, res) => {
    const inputTodowTask = req.body.todowTask;
  
    try {
      await Todow.create({ todowTask: inputTodowTask });
      res.redirect("/work"); // Redirect to the work route
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});

