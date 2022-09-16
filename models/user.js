import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    }
}, {collection: 'users'})


const User = mongoose.model('User', userSchema);
export default User;