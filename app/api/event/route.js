import { pool, schemas } from "@/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, name, borough, parking, toilets 
      FROM places 
      ORDER BY borough, name
    `);
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received event data:", body);
    
    if (!body.organizer_id) {
      return Response.json({ error: "organizer_id is required" }, { status: 400 });
    }

    const validated = schemas.event.parse(body);
    
    const result = await pool.query(
      `INSERT INTO meetups (
        organizer_id, title, description, place_id, date, 
        age_group, skill_level, max_participants, time_period
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        validated.organizer_id,
        validated.title,
        validated.description,
        validated.place_id,
        validated.date,
        validated.age_group,
        validated.skill_level,
        validated.max_participants,
        validated.time_period
      ]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    if (error instanceof schemas.z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}