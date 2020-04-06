let mongoose = require('../index');
let Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let departmentSchema = new Schema({
  name: String,
  description:String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Department', departmentSchema);