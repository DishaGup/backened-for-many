const { Schema, model } = require("mongoose");

const userWrapUpSchema = Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    projectname: { type: String,required:true },
    projectdesc: { type: String },
  },
  {
    versionKey: false,
  }
);

const UserWrapUpModel = model("WrapUp_users", userWrapUpSchema);

module.exports = { UserWrapUpModel };

/**
 * 
{
  "name": "Disha 2",
  "email": "disha2@gmail.com",
  "password": "disha2@123",
  "username": "Disha 2 Gupta",
  "age": 25,
  "location": "Agra"
} 

 * 
 */
