import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj user info");
    console.log(data);
    const email = data.email;
    const [response] = await pool.query(
      "SELECT * FROM uzytkownicy WHERE email = ?",
      [email]
    );
    const userData = response[0];

    return NextResponse.json({
      message: "to dane uzytkownika :)",
      data: userData,
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
