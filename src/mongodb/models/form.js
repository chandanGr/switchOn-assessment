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

// module.exports =  formSchema; 

module.exports = mongoose.model('Form', formSchema);