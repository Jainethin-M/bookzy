import mongoose from "mongoose"

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database connected successfully');
  } catch (err) {
    console.log('error in database Connection: ',err.message)
    process.exit(1)
  }
}

export default connectDB