import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj user api i dostalem dane ktore masz ponizej kotku");
    console.log(data);
    const id = data.dbID;
    const description = data.description;
    const [response] = await pool.query(
      "SELECT * FROM uzytkownicy WHERE id = ?",
      [id]
    );
    console.log({ response });

    await pool.query("UPDATE uzytkownicy SET opis = ? WHERE id = ?", [
      description,
      id,
    ]);

    return NextResponse.json({
      message: "hi, i received the data:)",
      description: "tutaj zwracam ci opis",
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
