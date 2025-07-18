import jwt from 'jsonwebtoken'
import User from '../models/user_model.js';

const protectRoute = async(req , res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(400).json({error : 'no token found'});
    }

    const validToken = jwt.verify(token , process.env.JWT_SECRET);
    if(!validToken){
        return res.status(400).json({error : 'invalid token'});
    }

    const user = await User.findOne({_id : validToken.userID})
   
    req.user = user;
    next();

  } catch (err) {
    console.log('error in protect route : ',err);
    return res.status(500).json('internal server error ')
  }
}


   

export default protectRoute;