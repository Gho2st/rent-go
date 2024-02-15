import { NextResponse } from "next/server";
import pool from "@/lib/db";

// function to check password strength

function checkPasswordStrength(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasLowercase &&
    hasNumber
  );
}
export async function POST(req, res) {
  try {
    const data = await req.json();

    if (
      !data.email ||
      !data.password ||
      !data.passwordRepeat ||
      !data.firstName ||
      !data.lastName
    ) {
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

    // password strength validation
    const isStrongPassword = checkPasswordStrength(data.password);
    if (!isStrongPassword) {
      return NextResponse.json({
        message: "Password is not strong enough",
      });
    }

    if (data.password !== data.passwordRepeat) {
      return NextResponse.json({
        message: "passwords are not the same",
      });
    }

    // check if the user already exists
    const [exisitingUsers] = await pool.execute(
      "SELECT * FROM uzytkownicy WHERE email = ?",
      [data.email]
    );

    if (exisitingUsers.length > 0) {
      return NextResponse.json({
        message: "User with this email already exists",
      });
    }

    // insert data into the database
    const [results, fields] = await pool.execute(
      "INSERT INTO uzytkownicy (email, password, firstName, lastName) VALUES (?, ?, ?, ?)",
      [data.email, data.password, data.firstName, data.lastName]
    );
    return NextResponse.json({
      message: "Registration succesfull",
    });
  } catch (error) {
    console.log("error inserting data into the database", error);
    return NextResponse.json({
      message: "An error occurred during registration",
    });
  }
}
