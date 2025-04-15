import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    username: String,
    age: Number,
    password: {
        type: String,
        required: true,
        select: false
    },
    role: String,
    refreshToken: {
        type: String,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: String,
        select: false
    }
})

userSchema.methods.toJSON = function () {
    const object = this.toObject()
    delete object.password
    return object
}

export default mongoose.model('User', userSchema)