const Mongoose = require("mongoose");

const {Schema}=Mongoose

const userSchema=new Schema({
    name:String,
    username:String,
    age:Number,
    password:String

})
const Model=Mongoose.model("user",userSchema)

module.exports=Model