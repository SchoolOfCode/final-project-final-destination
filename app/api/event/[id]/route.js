import { queries } from "@/db";

export async function GET(req, { params }) {
  const event = await queries.getEventById(params.id);
  return Response.json(event || {});
}