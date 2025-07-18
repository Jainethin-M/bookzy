import jwt from "jsonwebtoken";

const generateToken = (userID , res) => {
    const token = jwt.sign({userID} , process.env.JWT_SECRET,{
        expiresIn : '10d'
    })

    res.cookie('jwt',token,{
        maxAge : 1000*60*60*24*10,
        httpOnly : true,
        sameSite : 'strict',
        secure : (process.env.NODE_ENV === 'production')
    })
}

export default generateToken;