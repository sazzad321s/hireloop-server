import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {MongoClient, ObjectId} from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//Database Connection
const client = new MongoClient(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.heogdso.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db('hireloop');
const usersCollection = db.collection('user');
const jobsCollection = db.collection('jobs');

app.get('/', (req, res) => {
    res.send('Hireloop server is running');
});

//users Related API
app.get('/users', async (req, res) => {
   const cursor = usersCollection.find({});
   const results = await cursor.toArray();
   res.send(results);
});

//jobs Related API

app.get('/jobs', async (req, res) => {
   const cursor = jobsCollection.find()
   const results = await cursor.toArray();
   res.send(results);
});

app.post('/jobs', async (req, res) => {
    const job = req.body;
    const result = await jobsCollection.insertOne(job);
    res.send(result);
});

app.delete('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id)}
    const result = await jobsCollection.deleteOne(query);
    res.send(result);
})


app.listen(port, () => {
    console.log(`Hireloop is running on port ${port}`);
});