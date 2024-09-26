import { pool } from "@/db/script/index";
import { z } from "zod";
import { NextResponse } from "next/server";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  location: z.string(),
  date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  age_group: z.string(),
  skill_level: z.string(),
  max_participants: z.number().min(1, "Max participants must be a number greater than 0"),
  borough: z.string(),
  parking: z.enum(["Yes", "No"]),
  time_period: z.enum(["Morning", "Afternoon", "Evening"]),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validated = eventSchema.parse(body);

    const postedData = await pool.query(
      `INSERT INTO meetups (
        organizer_id, title, description, location, date, age_group, skill_level, max_participants, borough, parking, time_period
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )`,
      [
        1,  // Assuming organizer_id is 1
        validated.title,
        validated.description,
        validated.location,
        validated.date,
        validated.age_group,
        validated.skill_level,
        validated.max_participants,
        validated.borough,
        validated.parking,
        validated.time_period
      ]
    );

    return NextResponse.json({ message: "Event inserted successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
