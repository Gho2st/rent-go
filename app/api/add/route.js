import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("tutaj add i dostalem dane ktore masz ponizej kotku");
    console.log(data);
    const loc = data.loc;
    const title = data.title;
    const userID = data.userID;
    const price = data.price;
    const mainUrl = data.mainUrl;
    const description = data.description;
    const fuel = data.fuel;
    const type = data.type;
    const seats = data.seats;
    const gear = data.gear;
    const color = data.color;
    const mileage = data.mileage;
    const production = data.production;
    const power = data.power;
    const fuelUsage = data.fuelUsage;
    const engine = data.engine;
    console.log(mainUrl);
    const [response] = await pool.execute(
      "INSERT INTO post (userID, imageurl, title, price, loc, description, fuel, type, seats, gear, color, mileage, production, power, fuelUsage, engine) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userID,
        mainUrl,
        title,
        price,
        loc,
        description,
        fuel,
        type,
        seats,
        gear,
        color,
        mileage,
        production,
        power,
        fuelUsage,
        engine,
      ]
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
