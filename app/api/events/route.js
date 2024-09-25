import {NextResponse} from "next/server"
import {pool} from "@/db/script/index"


export async function GET(){
    let  res = await pool.query("SELECT * FROM meetups LIMIT 4;")
    return NextResponse.json(res.rows)
}

