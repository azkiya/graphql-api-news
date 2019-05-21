import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 }
});


// hash user password before saving into database
UserSchema.pre('save', async function() {
	this.password = await bcrypt.hashSync(this.password, saltRounds);
});

module.exports = mongoose.model('User', UserSchema);