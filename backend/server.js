import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import cors from 'cors';
import path from 'path';

// User-defined imports
import connectDB from './db/connectDB.js';
import authRoute from './routes/auth_route.js';
import productRoute from './routes/product_route.js';
import orderRoute from './routes/order_route.js';
import userRoute from './routes/user_route.js';

const app = express();

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// ROUTES
app.use('/api/auth', authRoute);
app.use('/api/admin/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);

// Serve frontend in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
    connectDB();
    console.log('Server running on port:', PORT);
});
