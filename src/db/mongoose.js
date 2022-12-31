import mongoose from "mongoose";

export default connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/mylist");
};
