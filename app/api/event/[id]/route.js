import { NextResponse } from "next/server";
import { pool } from "@/db/script/index";

export async function GET(req, { params }) {
  const id = params.id;
  let res = await pool.query("SELECT * FROM meetups WHERE id= $1;", [id]);
  return NextResponse.json(res.rows);
}
