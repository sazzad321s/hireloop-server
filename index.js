import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hireloop server is running');
});

app.listen(port, () => {
    console.log(`Hireloop is running on port ${port}`);
});