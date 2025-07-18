import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Products'
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    contact : {
        doorNumber : {
            type : String,
        },
        street : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        district : {
            type : String,
            required : true
        },
        phoneNumber : {
            type : String,
            required : true
        }
    },
    status : {
        type : String,
        default : 'ordered'
    }
},{timestamps : true});

const Order = mongoose.model('Orders',orderSchema);
export default Order;