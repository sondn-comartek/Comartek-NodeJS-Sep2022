
const mongoose = require('mongoose')
const schema = new mongoose.Schema(
  { email: 'string', password: 'string' }, {timestamps: true}
);
const UserModel = mongoose.model('users', schema);


module.exports = UserModel