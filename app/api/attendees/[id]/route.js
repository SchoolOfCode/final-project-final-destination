import { pool, schemas } from "@/db";
import { z } from "zod";

export async function GET(req, { params }) {
  try {
    const result = await pool.query(
      `SELECT 
        a.id AS attendee_id,
        a.user_id,
        a.child_id,
        a.status,
        u.name AS parent_name,
        c.first_name AS child_name
      FROM attendees a
      JOIN users u ON a.user_id = u.id
      JOIN children c ON a.child_id = c.id
      WHERE a.meetup_id = $1 AND a.status = 'confirmed'
      ORDER BY a.created_at ASC`,
      [params.id]
    );

    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const validated = schemas.attendee.parse(body);
    
    const result = await pool.query(
      `INSERT INTO attendees (user_id, child_id, meetup_id, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [
        validated.user_id,
        validated.child_id,
        validated.meetup_id,
        validated.status
      ]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
