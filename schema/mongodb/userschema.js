const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    Name : {
        type:String, 
        required : true
    },
    Age : {
        type : Number,
        required : true,
    },
    Email : {
        type : String, 
        required : true
    },
},
    {
        timestamps : true,
    }
)

module.exports = model("User",UserSchema);