import express from "express";
import cors from "cors";
import { db } from "../db/index.js";
import { schools, teamMembers } from "../db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 1. GET ALL SCHOOLS 
app.get("/schools", async (req, res) => {
  try {
    const allSchools = await db.select().from(schools);
    res.json(allSchools);
  } catch (err: any) {
    console.error("❌ Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});

// 2. CREATE A NEW SCHOOL
app.post("/schools", async (req, res) => {
  // Pull fields from the curl/frontend request body
  const {
    name,
    facilityId,
    facilityType,
    address,
    dateOfVisit,
    timeOfVisit,
    assessmentTeam,
  } = req.body;

  try {
    const newSchool = await db
      .insert(schools)
      .values({
        name,
        facilityId,
        facilityType,
        address,
        dateOfVisit,
        timeOfVisit,
        assessmentTeam,
      })
      .returning();

    console.log("✅ Success! Inserted:", newSchool[0].name);
    res.json(newSchool[0]);
  } catch (err: any) {
    // This will now print the EXACT Postgres error in your terminal
    console.error("❌ Postgres Insert Error:", err.message);
    res.status(500).json({ 
      error: "Failed to create school", 
      details: err.message 
    });
  }
});

// UPDATE A SCHOOL
app.put("/schools/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updated = await db.update(schools).set(updateData).where(eq(schools.id, parseInt(id))).returning();
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE A SCHOOL
app.delete("/schools/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(schools).where(eq(schools.id, parseInt(id))).returning();
    res.json(deleted[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});


app.get("/team", async (req, res) => {
  try {
    const allMembers = await db.select().from(teamMembers);
    res.json(allMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend Server ready at http://localhost:${port}`);
});

/**
 * test example
 * curl -X POST http://localhost:3000/schools \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Wild Lake Middle School",
       "facilityId": 1,
       "facilityType": "MS",
       "address": "10481 Cross Fox Lane, Columbia, MD 21044",
       "dateOfVisit": "03/28/2026",
       "timeOfVisit": "09:30 AM",
       "assessmentTeam": "G+P Architects - Team 1"
     }'
 */