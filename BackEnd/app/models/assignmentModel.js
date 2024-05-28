// models/assignmentModel.js
import { client } from '../config/mongodb.js';
import { ObjectId } from 'mongodb';

const db = client.db('database');
const collection = db.collection('assignments');

export { collection, ObjectId };
