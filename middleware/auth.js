import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {
      try {
        const token = req.header("auth-token");
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
      } catch (error) {
        console.log(error.message);
        res.status(400).send({msg: error.message});
      }
}
