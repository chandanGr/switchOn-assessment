let mongoose = require('../index');
let Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const formSchema = new Schema({
  formId: String,
  userName: String,
  description:String,
  status:String,
  assignedToDepartment:String,
  createdByDepartment: String,
  // createdBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  // assignedTo:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  // createdAt: {type: Date, default: Date.now},
  // updatedAt: {type: Date, default: Date.now}  
  createdBy:String,
  assignedTo:String,
  createdAt:String,
  updatedAt:String
});

let userSchema = new Schema({
  firstName: String,
  lastName:String,
  password:String,
  emailId:{type:String,unique:true},
  department:{type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  requestedForms: [formSchema],
  recievedForms: [formSchema],
  departmentForms: [formSchema],
});
module.exports = mongoose.model('User', userSchema);