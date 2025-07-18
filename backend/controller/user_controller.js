import User from '../models/user_model.js';
import Product from '../models/product_model.js';
import Order from '../models/order_model.js';

export const addToCart = async (req, res) => {
  try {
    const { prdid } = req.params;  // Get product ID from the request parameters
    const user = req.user

    

    if (user.myCart.includes(prdid)) {
      // If the product is already in the cart, remove it
      await User.updateOne({_id : user._id},{ $pull: { myCart: prdid } });
      
      return res.json({ message: 'Cart removed' });
    } else {
      // If the product is not in the cart, add it
      await User.updateOne({_id : user._id},{ $push: { myCart: prdid } });
      
      return res.json({ message: 'Cart added' });
    }


  } catch (err) {
    console.log('Error in addToCart route: \n', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getCart = async (req, res) => {
  try {
    
    const user = req.user

    const productsInCart = await Product.find({_id : {$in:user?.myCart}})
    res.json(productsInCart)
    

    


  } catch (err) {
    console.log('Error in getCart route: \n', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getOrder = async (req, res) => {
  try {
    
    const user = req.user

    const productsOrdered = await Order.find({_id : {$in:user?.myOrders}}).populate('productID')
    res.json(productsOrdered)
    

    


  } catch (err) {
    console.log('Error in getOrder route: \n', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
