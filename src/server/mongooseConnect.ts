import env from "dotenv";
env.config();

import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(process.env.MONGO_URI as string);

export default connectMongo;


// const connection = mongoose
//   .connect(process.env.MONGO_URI)
//   .then((connect) => {
//     console.log("🐕😊");
//     return connect;
//   })
//   .catch((err) => console.log(err));
