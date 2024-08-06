import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true,
        minLength:[10, "Phone number must contain 10 digit"],
        maxLength:[10, "Phone number must contain 10 digit"],
    },
    message:{
        type:String,
        require:true,
    }
});

export const Message = mongoose.model("Message",messageSchema)