import Order from "../models/order_model.js";
import Product from "../models/product_model.js";
import User from "../models/user_model.js";

export const order = async(req , res) => {
    try {
        const {prdid} = req.params;
        const {contact} = req.body;
        const product = await Product.findOne({_id : prdid});
        if(!product){
            return res.status(404).json({error : 'no product found'})
        }
        const user = req.user._id;
        const newOrder = new Order({
            productID : prdid,
            contact : contact,
            userID : user
        })
        if(newOrder){
            await newOrder.save();
            await User.updateOne({_id : user},{$push : {myOrders : newOrder._id}})
            return res.json({message : 'order placed'})
                
            
        }else {
            return res.json({error : 'unable to place an order'})
        }
    } catch (err) {
        console.log('error in order order-controller : \n',err)
        return res.status(500).json({error : 'internal server error '})
        
    }
}