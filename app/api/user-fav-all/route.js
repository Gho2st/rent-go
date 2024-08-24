import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    console.log("GET request received from user-fav-all");
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    const [user] = await pool.query(
      "SELECT id FROM uzytkownicy WHERE email = ?",
      [userEmail]
    );

    if (!user.length) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userID = user[0].id;

    const [posts] = await pool.query(
      "SELECT postID FROM favourites WHERE userID = ?",
      [userID]
    );

    if (!posts.length) {
      console.log("No favorite posts found");
      return NextResponse.json(
        { message: "No favorite posts found" },
        { status: 404 }
      );
    }

    // Construct a query dynamically for postsDetails
    const postIDs = posts.map((post) => post.postID);
    const placeholders = postIDs.map(() => "?").join(",");
    const [postsDetails] = await pool.query(
      `SELECT * FROM post WHERE id IN (${placeholders})`,
      postIDs
    );

    console.log(userID);
    console.log(posts.map((post) => post.postID));
    console.log(postsDetails);

    return NextResponse.json({
      userID,
      posts: posts.map((post) => post.postID),
      postsDetails,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
