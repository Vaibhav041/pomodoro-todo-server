import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    due:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    tomatoes:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"incomplete"
    },
    priority:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)
export default mongoose.model("todos", todoSchema);