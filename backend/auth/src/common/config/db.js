import mongoose from "mongoose"

const connectdb = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Mongodb connections is connecte the host ${conn.connection.host}`)
}

export default connectdb