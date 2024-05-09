import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj add i dostalem dane ktore masz ponizej kotku");
    console.log(data);
    const title = data.title;
    const userID = data.userID;
    const price = data.price;
    const mainUrl = data.mainUrl;
    console.log(mainUrl);
    const [response] = await pool.execute(
      "INSERT INTO post (userID, imageurl, title, price) VALUES (?, ?, ?, ?)",
      [userID, mainUrl, title, price]
    );
    console.log({ response });
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
