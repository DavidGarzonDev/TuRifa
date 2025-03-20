import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim : true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('User', userShema)