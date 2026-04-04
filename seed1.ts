// school_backend/seed.ts
import { db } from './db/index.js';
import { categories as categoriesTable } from './db/schema.js';

const categories = [
  { categoryId: 1, categories: "GENERAL REQUIREMENTS" },
  { categoryId: 2, categories: "SCHOOL SITE" },
  { categoryId: 3, categories: "SITE RECREATION + OUTDOOR PHYSICAL EDUCATION" },
  { categoryId: 4, categories: "ACADEMIC CLASSROOM SPACES" },
  { categoryId: 5, categories: "GENERAL USE CLASSROOMS" },
  { categoryId: 6, categories: "SPECIALTY CLASSROOMS" },
  { categoryId: 7, categories: "LIBRARY MEDIA CENTER" },
  { categoryId: 8, categories: "PHYSICAL EDUCATION" },
  { categoryId: 9, categories: "FOOD SERVICES" },
  { categoryId: 10, categories: "OTHER FACILITY AREAS" },
  { categoryId: 11, categories: "GENERAL STORAGE" },
  { categoryId: 12, categories: "MAINTENANCE & JANITORIAL SPACE" },
];

async function seedCategories() {
    console.log(" Seeding categories...");
    await db.insert(categoriesTable).values(categories).onConflictDoNothing();
    console.log("Done!")
    process.exit(0);
}

seedCategories();

// npx tsx seed1.ts

