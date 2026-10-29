const mongoose= require('mongoose');

const userProfileschema = new mongoose.Schema(
     {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            unique:true,
        },
        age:{type:Number,trim:true},
        dob:{type:String,trim:true},
        bio:{type:String,trim:true},
     },
     {timestamps:true}
);
module.exports = mongoose.model('UserProfile',userProfileschema);