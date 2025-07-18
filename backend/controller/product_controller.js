import cloudinary from 'cloudinary'
import Product from '../models/product_model.js';


export const createProduct = async(req , res) => {
    try {
        const {name , tag , category , price , inStock , description  } = req.body;
        let {productImage} = req.body;
        if(!name || !price ){
            return res.status(400).json({error : 'insufficient data'})
        }

        if(process.env.NODE_ENV === 'production' && productImage){
            const img = await cloudinary.uploader.upload(productImage);
            productImage = img.secure_url;
        }

        const newProduct = new Product({
            name , tag , category , price , inStock , description , 
            productImage
        })
        if(newProduct){
            await newProduct.save();
            return res.json({message : 'product added' , newProduct})
        }else {
            return res.json({error :'invalid product details'})
        }

    } catch (err) {
        console.log('error in createProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const editProduct = async(req , res) => {
    try {
        const {prdid} = req.params;
        const {name , tag , category , price , inStock , description  } = req.body;
        let {productImage} = req.body;
        const product = await Product.findOne({_id : prdid});
        // const product = await Product.findOne({_id : prdid});
        if(!product){
            return res.status(400).json({error : 'no product found'});
        }
        if(productImage){
            const img = await cloudinary.uploader.upload(productImage);
            productImage = img.secure_url;

            await cloudinary.uploader.destroy(product.productImage.split('/').pop().split('.')[0])
            product.productImage = productImage;
        }
        product.name = name || product.name;
        product.tag = tag || product.tag;
        product.category = category || product.category;
        product.price = price || product.price;
        product.inStock = inStock || product.inStock;
        product.description = description || product.description;

        await product.save();
        res.json(product)

        
    } catch (err) {
        console.log('error in editProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const deleteProduct = async(req , res) => {
    try {
        const {prdid} = req.params;

        const product = await Product.findOne({_id : prdid});
        if(!product){
            return res.status(404).json({error : 'no product found'})
        }
        if(product.productImage){
            await cloudinary.uploader.destroy(product.productImage.split('/').pop().split('.')[0])
        }
        await Product.findByIdAndDelete({_id : prdid});
        return res.json({message : 'product deleted'})

    } catch (err) {
        console.log('error in deleteProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const getProduct = async(req , res) => {
    try {
        const {prdid} = req.params;
        const product = await Product.findOne({_id : prdid})
        if(!product){
            return res.status(404).json({error : 'no product found'})
        }
        return res.json(product)


    } catch (err) {
        console.log('error in getProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const getAllProduct = async(req , res) => {
    try {
        
        const products = await Product.find();
        if(products.length === 0){
            return res.json([]);
        }else {
            return res.json(products)
        }

    } catch (err) {
        console.log('error in getAllProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const filterProductOptions = async (req, res) => {
    try {
      const { field } = req.query;
  
      // Check if the field is provided
      if (!field) {
        return res.status(400).json({ error: 'Field is required in query parameter' });
      }
  
      // Check if the field exists in the Product schema
      const allowedFields = ['category', 'tag']; // Add all valid fields here
      if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field specified' });
      }
  
      // Fetch distinct values for the field
      const distinctValues = await Product.distinct(field);
  
      // Send the result
      res.status(200).json(distinctValues);
    } catch (err) {
      console.error('Error in filterProductOptions product route:\n', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export const getSomeProduct = async(req , res) => {
    try {
        
    } catch (err) {
        console.log('error in getSomeProduct product route : \n',err)
        return res.status(500).json({error : 'internal server error'})
    }
}

