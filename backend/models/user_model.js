import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String,
        default : ''
    },
    address : {
        type : String,
    },
    myOrders : [{
        
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        default : []

    }],
    myCart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Products',
        default: []
    }]
},{timestamps : true})

const User = mongoose.model('User',userSchema);
export default User;