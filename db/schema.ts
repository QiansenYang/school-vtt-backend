import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const schools = pgTable('schools', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    location: text('location'),
    category: text('category'),
    createAt: timestamp('created_at').defaultNow().notNull(),
});