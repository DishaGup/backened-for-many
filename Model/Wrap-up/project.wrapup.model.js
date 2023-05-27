const mongoose = require("mongoose");

const StatusEnum = Object.freeze({
    HIGH: 'high',
    LOW: 'low',
    NO: 'None',
  });
const TodoWrapUpSchema = mongoose.Schema(
  {
    title:{type:String,require:true},
    status:{type:Boolean},
    priority:{
        type: String,
        enum: Object.values(StatusEnum),
        default: StatusEnum.NO,
      },
     desc:{type:String},
      userId: { type: String, required: true },
      firstname:{ type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const TodoWrapUpModel = mongoose.model(
  "wrapup_todos",
  TodoWrapUpSchema
);

module.exports = { TodoWrapUpModel };
