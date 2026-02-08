//courseId- objectId, required
//userId - objectId, required

import mongoose, { Schema } from "mongoose";

const purchaseSchema=new Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
})

