import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    tag : {
        type : String,
        default : 'not set'
    },
    category : {
        type : String,
        default : 'not set'
    },
    price : {
        type : String,
        required : true,
    },
    inStock : {
        type : String,
        required : true,
        default : 'in stock'
    },
    description : {
        type : String,
        required : true,
        default : 'no description'
    },
    productImage : {
        type : String,
        default : ''
    },
    review : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review',
        default : []
    }],
    
},{timestamps : true});
const Product = mongoose.model('Products',productSchema);
export default Product;
