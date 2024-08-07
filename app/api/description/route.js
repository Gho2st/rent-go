import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj user description");
    console.log(data);
    const email = data.email;
    const description = data.description;
    const [response] = await pool.query(
      "SELECT * FROM uzytkownicy WHERE email = ?",
      [email]
    );
    console.log({ response });

    await pool.query("UPDATE uzytkownicy SET opis = ? WHERE email = ?", [
      description,
      email,
    ]);

    return NextResponse.json({
      data: response,
      description: description,
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
