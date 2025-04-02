import { pool } from "@/db";

export async function GET(req, { params }) {
  try {
    const result = await pool.query(
      "SELECT is_organizer FROM users WHERE id = $1",
      [params.id]
    );
    
    return Response.json({ is_organizer: result.rows[0]?.is_organizer || false });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
