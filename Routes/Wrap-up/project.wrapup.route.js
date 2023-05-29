const express = require("express")
const TodoWrapUpRouter = express.Router();
const {TodoWrapUpModel} = require("../../Model/Wrap-up/project.wrapup.model");
const {auths} =require("../../MiddleWare/login.wrapup.middleware")


//adding the todos by admin
TodoWrapUpRouter.post("/add",auths ,async (req, res) => {
  let body={...req.body,timecreated:Date()}
  try {
    const medi =new TodoWrapUpModel(body);
    await medi.save();
    res.status(200).send("Successfully added Data");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

TodoWrapUpRouter.get("/get/userdata",auths ,async (req, res) => {
//console.log(res.todos)
   //console.log( Date.now()-res.todos[2].timecreated )
  try {
    const medi = await TodoWrapUpModel.find({ userId: req.body.userId });
    res.status(200).send({ todos: medi,diff:(new Date-medi[3].timecreated)/86400000 });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

TodoWrapUpRouter.patch("/update/:id",auths,async (req, res) => {
  const { id } = req.params;

  try {
   
      const data = await TodoWrapUpModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send("data has been updated");
    
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


TodoWrapUpRouter.delete("/delete/:id", auths,async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TodoWrapUpModel.findByIdAndDelete({ _id: id });
    res.send("data has been Deleted");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


TodoWrapUpRouter.get("/single/:id", auths,async (req, res) => {
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