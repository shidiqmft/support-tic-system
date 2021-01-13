const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
mongoose.model('Admin', AdminSchema);

module.exports = mongoose.model('Admin');