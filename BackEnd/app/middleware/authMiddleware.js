import jwt from 'jsonwebtoken';
import { collection, ObjectId } from '../models/userModels.js';
import dotenv from 'dotenv';

dotenv.config();

export const authorize = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await collection.findOne({ _id: new ObjectId(decoded.id) });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (roles.length && !roles.includes(user.rol)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error authorizing user:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
