import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/Todo.js";
const app = express();

const corsConfig = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.json());
app.use(cors(corsConfig));
dotenv.config();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true }).then(() => {
  console.log("db");
});

app.post('/todo/add', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(200).json('added');
  } catch (err) {
    res.status(500).json(err);
  }
})

app.put('/todo/update/:id', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {status:"completed"});
    res.status(200).json('updated');
  } catch (err) {
    res.status(500).json(err);
  }
})

app.delete('/todo/delete/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json('deleted');
  } catch (err) {
    res.status(500).json(err);
  }
})

app.get('/todo/get', async (req, res) => {
  try {
    let response = await Todo.find({});
    res.status(200).json(response);
    
  } catch (err) {
    res.status(500).json(err);
  }
})

app.put('/todo/add-tomatoes/:id/:cnt', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      $inc: { tomatoes: req.params.cnt },
    })
    res.status(200).json('updated');
  } catch (err) {
    res.status(500).json(err);
  }
})


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("connected");
});