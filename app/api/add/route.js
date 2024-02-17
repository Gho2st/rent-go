import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log(data);
    return NextResponse.json({
      message: "hi, i received the data:)",
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
