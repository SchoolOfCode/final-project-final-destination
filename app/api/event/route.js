import { NextResponse } from "next/server";
import { pool } from "@/db/script/index";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  location: z.string(),
  date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  age_group: z.string(),
  skill_level: z.string(),
  max_participants: z
    .string()

    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: "Max participants must be a number",
    }),
  borough: z.string(),
  parking: z.enum(["Yes", "No"]),
  time_period: z.enum(["Morning", "Afternoon", "Evening"]),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validated = eventSchema.parse(body);
    return NextResponse.json(
      { "Validated meetup data": validated },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
