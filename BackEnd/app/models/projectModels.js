// models/projectModel.js
import { client } from '../config/mongodb.js';
import { ObjectId } from 'mongodb';

const db = client.db('database'); // Cambia 'Database' al nombre de tu base de datos
const collection = db.collection('projects');

export { collection, ObjectId };
