import {NextResponse} from "next/server"
import {pool} from "@/db/script/index"


export async function GET(){
    let  databaseResponse= await pool.query("SELECT * FROM meetups LIMIT 4;")
    return NextResponse.json(databaseResponse)
}

