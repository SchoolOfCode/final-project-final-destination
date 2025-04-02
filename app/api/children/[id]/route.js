import { pool } from "@/db";

export async function DELETE(req, { params }) {
  try {
    await pool.query("DELETE FROM children WHERE id = $1", [params.id]);
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
