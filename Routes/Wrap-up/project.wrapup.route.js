const express = require("express")
const TodoWrapUpRouter = express.Router();
const {TodoWrapUpModel} = require("../../Model/Wrap-up/project.wrapup.model");
const {auth} =require("../../MiddleWare/login.wrapup.middleware")


//adding the todos by admin
TodoWrapUpRouter.post("/add",auth ,async (req, res) => {
  try {
    const medi =new TodoWrapUpModel(req.body);
    await medi.save();
    res.status(200).send("Successfully added Data");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

TodoWrapUpRouter.get("/get/userdata",auth ,async (req, res) => {
   // console.log(req.body,'..19')
  try {
    const medi = await TodoWrapUpModel.find({ userId: req.body.userId });
    res.status(200).send({ todos: medi });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

TodoWrapUpRouter.patch("/update/:id",async (req, res) => {
  const { id } = req.params;

  try {
   
      const data = await TodoWrapUpModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send("data has been updated");
    
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


TodoWrapUpRouter.delete("/delete/:id", auth,async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TodoWrapUpModel.findByIdAndDelete({ _id: id });
    res.send("data has been Deleted");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


TodoWrapUpRouter.get("/single/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const medi = await TodoWrapUpModel.findById({ _id: id });
    res.status(200).send({ todos: medi });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


TodoWrapUpRouter.get("/search", async (req, res) => {
  

let filters={}
  if (req.query.title) {
    filters.projectname = { $regex: req.query.title, $options: "i" };
  }

  try {
    
    const todos = await TodoWrapUpModel.find(filters).skip(0)
   
    res.status(200).send({ todos});
   
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});




module.exports = { TodoWrapUpRouter };