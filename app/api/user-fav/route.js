import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    console.log("get here from user-fav")
    const { searchParams } = new URL(request.url);
    const postID = searchParams.get("postID");
    const userEmail = searchParams.get("userEmail");

    const [user] = await pool.query(
      "SELECT id FROM uzytkownicy WHERE email = ?",
      [userEmail]
    );

    console.log(user)

    if (!user.length) {
      console.log("user not found")
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userID = user[0].id;

    const [result] = await pool.query(
      "SELECT 1 FROM favourites WHERE userID = ? AND postID = ?",
      [userID, postID]
    );

    const isFavPost = result.length > 0;

    console.log(isFavPost)

    return NextResponse.json({
      isFavPost,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "An error occurred",
        error: error.message,
      },
      { status: 500 }
    );
  }
}




// POST !!!!





export async function POST(request) {
  try {
    const data = await request.json();
    console.log("user-info api here ");
    console.log(data);
    const isFavPost = data.isFavPost;
    const postID = data.postID;
    const userEmail = data.userEmail;

    const [user] = await pool.query(
      "SELECT id FROM uzytkownicy WHERE email = ?",
      [userEmail]
    );

    if (!user.length) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userID = user[0].id;

    if (isFavPost === true) {
      await pool.execute(
        "INSERT INTO favourites (userID, postID) VALUES (?, ?)",
        [userID, postID]
      );
    } else {
      await pool.execute(
        "DELETE FROM favourites WHERE userID = ? AND postID = ?",
        [userID, postID]
      );
    }

    return NextResponse.json({
      message: "data about fav posts succesfully sent",
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
