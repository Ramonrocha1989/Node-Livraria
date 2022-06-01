import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:123@alura.oin5u1g.mongodb.net/alura");

let db = mongoose.connection;

export default db;