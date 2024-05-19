import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj user api i dostalem dane ktore masz ponizej kotku");
    console.log(data);
    const id = data.id;
    console.log(id)
    const [response] = await pool.query(
      "SELECT * FROM uzytkownicy WHERE id = ?",
      [id]
    );
    const userData = response[0]

    return NextResponse.json({
      message: "hi, i received the data:)",
      data: userData,
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
