import { queries } from "@/db";

export async function GET() {
  const events = await queries.getAllEvents();
  return Response.json(events);
}