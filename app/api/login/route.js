import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req, res) {
  try {
    const data = await req.json();

    if (!data.email || !data.password) {
      return NextResponse.json({
        message: "Please provide all required fields.",
      });
    }

    // basic email format validation using a regular expression

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({
        message: "Invalid email address.",
      });
    }

    // check if the user already exists
    const [exisitingUsers] = await pool.execute(
      "SELECT * FROM uzytkownicy WHERE email = ?",
      [data.email]
    );

    if (exisitingUsers.length === 0) {
      return NextResponse.json({
        message: "User with this email does not exist. Make a account",
      });
    }

    //compare the provided password with this in database
    if (exisitingUsers[0].password !== data.password) {
      return NextResponse.json({
        message: "Incorrect password",
      });
    }

    // successfull login (demo)
    return NextResponse.json({
        message: "Login succesful"
    })

  } catch (error) {
    console.log("error during login: ", error);
    return NextResponse.json({
      message: "An error occurred during login",
    });
  }
}
