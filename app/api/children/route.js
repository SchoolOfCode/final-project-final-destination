import { pool, schemas } from "@/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM children ORDER BY created_at DESC"
    );
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const validated = schemas.child.parse(body);
    
    const result = await pool.query(
      `INSERT INTO children (first_name, user_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [validated.first_name, validated.user_id]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
