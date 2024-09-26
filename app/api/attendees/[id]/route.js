import { pool } from "@/db/script/index";
import { NextResponse } from "next/server";
import { z } from "zod";

const AttendeeSchema = z.object({
  user_id: z.number().int().positive(),
  meetup_id: z.number().int().positive(),
  status: z.string(),
});

export async function GET(req, { params }) {
  let res = await pool.query(`SELECT 
    a.id AS attendee_id,
    u.parents_name,
    u.child_name,
    a.meetup_id,
    a.status
FROM 
    attendees a
JOIN 
    users u ON a.user_id = u.id
WHERE 
    a.meetup_id = $1 AND a.status = 'confirmed';`, [params.id]);
  return NextResponse.json(res.rows);
}

export async function POST(req) {
  const body = await req.json();
  const attendee = AttendeeSchema.parse(body);
  let res = await pool.query(
    "INSERT INTO attendees (user_id, meetup_id, status) VALUES ($1, $2, $3) RETURNING *;",
    [attendee.user_id, attendee.meetup_id, attendee.status]
  );
  return NextResponse.json(res.rows[0]);
}
