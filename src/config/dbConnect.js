import mongoose from "mongoose";

mongoose.connect("mongodb+srv://trab_frame:030189@cluster0.nrhkjhn.mongodb.net/test");

let db = mongoose.connection;

export default db;