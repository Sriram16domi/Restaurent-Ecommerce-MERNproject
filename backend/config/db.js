import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sriram:SJ4Ll7LccDzBdWqT@cluster0.m0c9g.mongodb.net/food-del').then(()=>console.log("DB CONNECTED"));
}