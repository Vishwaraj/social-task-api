import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {collection: 'books'})

const Book = mongoose.model('Book', bookSchema);

export default Book;