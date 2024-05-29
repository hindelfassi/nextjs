// pages/api/data.js
import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://hindelfassi97:GrsgTrf0pcF4iJxz@test-api.wl3ipsq.mongodb.net/?retryWrites=true&w=majority&appName=test-api"; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { id } = req.query; // Extract the ID from the URL path

  try {
    await client.connect();
    const db = client.db("book-list"); // Replace with your database name
    const collection = db.collection("books"); // Replace with your collection name

    if (id) {
      // Find the document by ID
      const data = await collection.findOne({ fileID: id });

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Document not found" });
      }
    } else {
      // Get all documents (if no ID is provided)
      const data = await collection.find({}).toArray();

      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  } finally {
    await client.close();
  }
}
