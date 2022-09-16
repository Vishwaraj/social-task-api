import express, { response } from 'express';
import { ObjectId } from 'mongodb';
import Book from "../models/book.js"



//add multiple books
export const addBooks = async (req, res) => {
    const data = req.body;
    try {
        const result = Book.insertMany(data);
        res.send({msg: 'successfully added', result:result});
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }

}

//delete single book
export const deleteBook = async (req,res) => {
    const id = req.body.id;
    try {
     const result = await Book.deleteOne({_id: ObjectId(id)})
     console.log(result);
     res.status(200).send({msg: 'deleted successfully', result: result});
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }
}

//add single book
export const addSingleBook = async (req, res) => {
   const data = req.body;
   try {
    
   const result = await Book.create(data);

   res.status(200).send({msg: 'successfully added', result: result});

   } catch (error) {
    console.log(error.message);
    res.status(400).send({error: error.message});
   }
}


//view all books
export const getAllBooks = async (req, res) => {
   try {
    const result = await Book.find({});
    res.status(200).send(result);
   } catch (error) {
    
   }
}



//view book by search
export const getSingleBook = async (req, res) => {
    const query = req.body.query;
    try {
        
    let result = await Book.find({});
    
    result = result.filter((book) => {
        return book.name.toLowerCase().includes(query);
    })

    res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send({msg: error.message});
    }
}


//update single book

export const updateSingleBook = async (req, res) => {
   
   const id = req.params.id;

   const data = req.body;
   
   try {
    const result = await Book.updateOne({_id: ObjectId(id)}, {
        $set: data
    });

    console.log(result);

    res.status(200).send({msg: "update success", result: result});
   } catch (error) {
    console.log(error);
    res.status(400).send({error: error.message});
   }

}

