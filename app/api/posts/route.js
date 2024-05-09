import pool from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const [posts] = await pool.query("SELECT * FROM post"); // the name of the table is post
  const json = {
    posts,
  };

  return NextResponse.json(json);
}
