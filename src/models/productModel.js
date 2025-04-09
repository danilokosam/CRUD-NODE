import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    availability: Number
})

export default mongoose.model('Product', productSchema)