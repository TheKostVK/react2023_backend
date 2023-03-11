import mongoose from "mongoose";


const mongodbURL = 'mongodb://localhost:27017/'
const dbName = 'techDB'


export const dbConnect = async () => {
    try {
        await mongoose.connect(`${mongodbURL}${dbName}`)
        console.log("\x1b[32m", '[DB] Connect success')
    } catch (error) {
        console.log("\x1b[31m", '[DB] Connect error')
    }
}
