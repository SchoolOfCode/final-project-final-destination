import pg from "pg";
import { z } from "zod";
import "dotenv/config";

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("No DB_CONNECTION_STRING defined. Did you load in your env variables?");
}

export const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const schemas = {
  child: z.object({
    first_name: z.string().min(1, "Child's first name is required"),
    user_id: z.number().int().positive(),
  }),

  place: z.object({
    name: z.string().min(1, "Name is required"),
    primary_use: z.string(),
    borough: z.string(),
    area_ha: z.number().positive(),
    coordinates: z.string().regex(
      /^-?\d+\.?\d*,\s*-?\d+\.?\d*$|^\d+\.?\d*°\s*[NS],\s*\d+\.?\d*°\s*[EW]$/,
      "Coordinates must be in format '51.542553,-0.484211' or '51.5549° N, 0.0242° W'"
    ),
    parking: z.boolean(),
    toilets: z.boolean(),
  }),

  event: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    place_id: z.number().int().positive("Valid place ID is required"),
    date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    age_group: z.string(),
    skill_level: z.string(),
    max_participants: z.number().min(1),
    time_period: z.enum(["Morning", "Afternoon", "Evening"]),
  }),

  attendee: z.object({
    user_id: z.number().int().positive(),
    child_id: z.number().int().positive(),
    meetup_id: z.number().int().positive(),
    status: z.enum(["confirmed", "pending"]),
  }),
};

export const queries = {
  getAllEvents: async () => {
    const result = await pool.query(`
      SELECT 
        m.*,
        p.name as place_name,
        p.coordinates as place_coordinates,
        p.borough as place_borough,
        p.parking as place_parking,
        p.toilets as place_toilets,
        u.name as organizer_name
      FROM meetups m
      JOIN places p ON m.place_id = p.id
      JOIN users u ON m.organizer_id = u.id
    `);
    return result.rows;
  },

  getEventById: async (id) => {
    const result = await pool.query(
      `SELECT 
        m.id,
        m.title,
        m.description,
        m.date,
        m.age_group,
        m.skill_level,
        m.max_participants,
        m.time_period,
        m.created_at,
        p.name as place_name,
        p.coordinates as place_coordinates,
        p.borough as place_borough,
        p.parking as place_parking,
        p.toilets as place_toilets,
        u.name as organizer_name
      FROM meetups m
      JOIN places p ON m.place_id = p.id
      JOIN users u ON m.organizer_id = u.id
      WHERE m.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  getEventAttendees: async (meetupId) => {
    const result = await pool.query(
      `SELECT 
        a.id AS attendee_id,
        u.name AS parent_name,
        c.first_name AS child_name,
        a.meetup_id,
        a.status
      FROM attendees a
      JOIN users u ON a.user_id = u.id
      JOIN children c ON a.child_id = c.id
      WHERE a.meetup_id = $1 AND a.status = 'confirmed'`,
      [meetupId]
    );
    return result.rows;
  },

  getUserChildren: async (userId) => {
    const result = await pool.query(
      "SELECT * FROM children WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  },
};