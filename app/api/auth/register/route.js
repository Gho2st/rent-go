import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import pool from "@/lib/db";
import passwordValidator from "password-validator";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    // validate email and password
    console.log({ email, password, firstName, lastName });

    // check that if user is already in data base

    const [existingUser] = await pool.execute(
      "SELECT * FROM uzytkownicy WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      console.log("uzytkownik juz istnieje.");
      return NextResponse.json({
        message: "uzytkownik o tym adresie e-mail juz istnieje.",
      });
    }

    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(8) // Minimum 8 znaków
      .is()
      .max(50) // Maksymalnie 50 znaków
      .has()
      .uppercase() // Przynajmniej jedna duża litera
      .has()
      .lowercase() // Przynajmniej jedna mała litera
      .has()
      .digits(1) // Przynajmniej jedna cyfra
      .has()
      .not()
      .spaces(); // Brak spacji

    if (!passwordSchema.validate(password)) {
      console.log("haslo nie spelnia wymagan");
      return NextResponse.json({ message: "haslo nie spelnia wymagan" });
    }

    const hashedPassword = await hash(password, 10);

    const [response] = await pool.execute(
      "INSERT INTO uzytkownicy (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );
    console.log({ response });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
