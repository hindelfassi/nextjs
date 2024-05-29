// pages/api/data.js
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/"; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("book-list"); // Replace with your database name
    const collection = db.collection("books"); // Replace with your collection name

    const data = await collection.find({}).toArray(); // Get all documents

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  } finally {
    await client.close();
  }
}
