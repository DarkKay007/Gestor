import { client } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const db = client.db("database");
const collection = db.collection("tasks");

export { collection, ObjectId };