// school_backend/seed.ts
import { db } from './db/index.js';
import { teamMembers } from './db/schema.js';

const members = [
  { name: "Kirsten Zuzin", email: "knzuzin@gparch.com" },
  { name: "Jonathan Hill", email: "jshill@gparch.com" },
  { name: "Michael Smyles", email: "msmyles@gparch.com" },
  { name: "Tony Nie", email: "tnie@gparch.com" },
  { name: "Rick Morrison", email: "rmorrison@gparch.com" },
  { name: "Julia Pryor", email: "jpryor@gparch.com" },
  { name: "Reilly O'Grady", email: "rogrady@gparch.com" },
  { name: "Asma Sofan", email: "asofan@gparch.com" },
  { name: "Taban Taslim", email: "ttaslim@gparch.com" },
  { name: "Julio Cruz", email: "jcruz@gparch.com" },
  { name: "Qiansen Yang", email: "qyang@gparch.com" },
  { name: "Michael Berry", email: "mberry@gparch.com" },
  { name: "Anna Scheffel", email: "ascheffel@gparch.com" },
  { name: "Paul Bradshaw", email: "pbradshaw@gparch.com" },
  { name: "Morgan McGee", email: "mmcgee@gparch.com" },
];

async function seed() {
    console.log(" Seeding team members...");
    await db.insert(teamMembers).values(members).onConflictDoNothing();
    console.log("Done!")
    process.exit(0);
}

seed();

// one time run
// npx tsx seed.ts