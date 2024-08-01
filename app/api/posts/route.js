import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const loc = searchParams.get("loc") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  let query = "SELECT * FROM post WHERE 1=1";
  const queryParams = [];

  if (loc) {
    query += " AND loc = ?";
    queryParams.push(loc);
  }

  if (startDate) {
    query += " AND startDate >= ?";
    queryParams.push(startDate);
  }

  if (endDate) {
    query += " AND endDate <= ?";
    queryParams.push(endDate);
  }

  try {
    const [posts] = await pool.query(query, queryParams);
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
