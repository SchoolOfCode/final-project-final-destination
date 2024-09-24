import { pool } from "../index.js";


async function resetDatabase() {
  try {
    // Drop existing tables if they exist NEED TO CHANGE ! 
    await pool.query(`
        DROP TABLE IF EXISTS boats CASCADE;
        DROP TABLE IF EXISTS passengers CASCADE;
    `);

    // Create the boats table
    await pool.query(`
        CREATE TABLE users (
             id bigint INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(100),
            role

        create table users (
    id bigint primary key generated always as identity,
    name text not null,
    email text unique not null,
    phone text,
    role text not null
  );
        );
    `);

    // Create the passengers table with a foreign key to the boats table
    await pool.query(`
        CREATE TABLE passengers (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT,
            boat_id INT REFERENCES boats(id)
        );
    `);

    // Seed the boats table
    await pool.query(`
        INSERT INTO boats (name, capacity)
        VALUES 
            ('Serenity', 10),
            ('Wave Rider', 6);
    `);

    // Seed the passengers table
    await pool.query(`
        INSERT INTO passengers (name, age, boat_id)
        VALUES 
            ('John Doe', 35, 1),
            ('Jane Smith', 28, 1),
            ('Mike Johnson', 42, 2),
            ('Emily Brown', 31, 2),
            ('David Wilson', 39, 1);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();




  create table meetups (
    id bigint primary key generated always as identity,
    name text not null,
    location text not null,
    date date not null,
    organizer_id bigint references users (id)
  );
  
  create table attendees (
    id bigint primary key generated always as identity,
    meetup_id bigint references meetups (id),
    user_id bigint references users (id),
    child_name text not null
  );
  
  alter table attendees
  drop constraint attendees_meetup_id_fkey;drop table meetups;create table meetups (
    id bigint primary key generated always as identity,
    organizer_id bigint references users (id),
    title text not null,
    description text,
    location text,
    date timestamp with time zone,
    age_group text,
    skill_level text,
    max_participants int
  );
  
  alter table attendees
  add constraint attendees_meetup_id_fkey foreign key (meetup_id) references meetups (id);drop table if exists users cascade;create table users (
    id bigint primary key generated always as identity,
    name text not null,
    email text unique not null,
    password text not null,
    phone text,
    role text,
    profile_picture text
  );
  
  drop table if exists attendees;create table attendees (
    id bigint primary key generated always as identity,
    user_id bigint references users (id),
    meetup_id bigint references meetups (id),
    status text,
    created_at timestamp with time zone default now()
  );