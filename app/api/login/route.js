import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateToken(id) {
  const secretKey = "julcion"; // Replace with your actual secret key
  const token = jwt.sign({ id }, secretKey, { expiresIn: "1h" }); // You can customize the expiration time
  return token;
}


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

    //compare the provided password with this in database (the hashed one)
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      exisitingUsers[0].password
    );

    if (!isPasswordMatch) {
      return NextResponse.json({
        message: "Incorrect password"
      })
    }

    const token = generateToken(exisitingUsers[0].id)

    // successfull login (demo)
    return NextResponse.json({
      message: "Login succesful",
      token: token,
    });
  } catch (error) {
    console.log("error during login: ", error);
    return NextResponse.json({
      message: "An error occurred during login",
    });
  }
}
