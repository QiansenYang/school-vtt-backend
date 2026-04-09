// school_backend/db/schema.ts
import { pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

export const teamMembers = pgTable('team_members', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
});

export const schools = pgTable('schools', {
    id: serial('id').primaryKey(),
    facilityId: text('facility_id'),
    name: text('name').notNull(),
    facilityType: text('facility_type'),
    address: text('address'),
    dateOfVisit: text('date_of_visit'),
    timeOfVisit: text('time_of_visit'),
    assessmentTeam: jsonb('assessment_team').default([]),
    createAt: timestamp('created_at').defaultNow().notNull(),
});

export const rooms = pgTable('rooms', {
    id: serial('id').primaryKey(),
    schoolId: integer('school_id').references(() => schools.id),
    roomNumber: text('room_number').notNull(),
    roomName: text('room_name'),
});

export const assessmentScores = pgTable('assessment_scores', {
    id: serial('id').primaryKey(),
    roomId: integer('room_id').references(() => rooms.id),
    category: text('category').notNull(),
    score: integer('score').default(5),
    comments: text('comments'),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    categoryId: integer('categoryId'),
    categories: text('categories'),
})

// npx drizzle-kit push