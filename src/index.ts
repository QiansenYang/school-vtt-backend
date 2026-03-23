import express from 'express';
import cors from 'cors';
import { db } from '../db/index.js';
import { schools } from '../db/schema.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all schools from Postgres
app.get('/schools', async (req, res) => {
    try {
        const allSchools = await db.select().from(schools);
        res.json(allSchools);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch schools"});
    }
});

app.post('/schools', async (req, res) => {
    const { name, location, category } = req.body;
    try {
        const newSchool = await db.insert(schools).values({ name, location, category }).returning();
        res.json(newSchool);
    } catch (err) {
        res.status(500).json({ error: "Failed to create school" });
    }
});

app.listen(port, () => {
    console.log(`Backend Server ready at http://localhost:${port}`);
});


//npx tsx src/index.ts