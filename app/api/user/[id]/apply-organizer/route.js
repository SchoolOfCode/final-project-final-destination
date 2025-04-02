import { pool } from "@/db";

export async function POST(req, { params }) {
  try {
    // First set the pending state
    await pool.query(
      "UPDATE users SET is_organizer = false WHERE id = $1",
      [params.id]
    );

    // Simulate background check and approval process
    setTimeout(async () => {
      try {
        await pool.query(
          "UPDATE users SET is_organizer = true WHERE id = $1",
          [params.id]
        );
        console.log(`User ${params.id} automatically approved as organizer after delay`);
      } catch (error) {
        console.error("Error in delayed organizer approval:", error);
      }
    }, 30000); // 30 seconds delay

    return Response.json({ status: "pending" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
