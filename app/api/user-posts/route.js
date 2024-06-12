import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {

    const data = await request.json();

    const email = data.email;

    // Sprawdź, czy email został przesłany
    if (!email) {
      return NextResponse.json(
        { error: "Brak emaila w żądaniu" },
        { status: 400 }
      );
    }

    // Pobierz ID użytkownika na podstawie emaila
    const [userRows] = await pool.query(
      "SELECT id FROM uzytkownicy WHERE email = ?",
      [email]
    );
    if (userRows.length === 0) {
      return NextResponse.json(
        { error: "Użytkownik nie znaleziony" },
        { status: 404 }
      );
    }

    const userID = userRows[0].id;
    console.log(userID);

    // Pobierz posty użytkownika na podstawie jego ID
    const [posts] = await pool.query("SELECT * FROM post WHERE userID = ?", [
      userID,
    ]);


    const json = { posts };

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error in user-posts API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
