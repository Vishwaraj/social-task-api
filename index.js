import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import mongoose from 'mongoose';
import { addBooks, addSingleBook, deleteBook, getAllBooks, getSingleBook, updateSingleBook } from './controllers/book.js';
import { login, signUp } from './controllers/user.js';
import { auth } from './middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT=4000;


//mongo connection
const MONGO_URL = process.env.MONGO_URL;


app.listen(PORT, () => {
    console.log('Server running on ' + PORT);
});

await mongoose.connect(MONGO_URL).then(()=>console.log('MongoDB connected'));


app.get('/', (req,res) => {
    res.send(readmeFirst)
});

const readmeFirst = `Welcome to the bookstore
<br>
below are all the routes and steps to follow
<br>
<ul>
<li>/user/signup -- first sign up with a username and password -- DEMO Credentials - username: testuser  |  password: testuser123</li>
<br>
<li>/user/login -- when logging in with the correct credentials you will be provided with a token, please copy it somewhere as it is required for further operation as a header value for "auth-token"</li>
<br>
<li>/books/all -- this gives a list of all the books</li>
<br>
<li>/books/search -- in postman send a post request with body having a query key and search term as value</li>
<br>
<li>/add-one-book -- in postman send a post request with book object as per the schema</li>
<br>
<li>/books/update/:id -- in postman pass the objectID of book as a url parameter to update its content</li>
<br>
<li>/delete-book -- in postman make a delete request with body having id as key and the object id of the book you wish to delete</li>
</ul>
`


//get all books
app.get('/books/all', auth ,getAllBooks);

//get single book
app.post('/books/search', auth ,getSingleBook);

//add multiple books, only for initial upload.
app.post('/add-books', auth ,addBooks);

//add single book
app.post('/add-one-book', auth ,addSingleBook);

//update single book
app.put('/books/update/:id', auth ,updateSingleBook);

//delete single book
app.delete('/delete-book', auth ,deleteBook);

//-----------for user-----------------------------------

app.post('/user/signup', signUp);
app.post('/user/login',login);



