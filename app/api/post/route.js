import pool from "@/lib/db";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export async function POST(request) {
  try {
    console.log("hej tu api /post");
    const data = await request.json();
    console.log(data);
    const id = data.id;
    const [post] = await pool.query("SELECT * FROM post WHERE id= ?", [id]);
    console.log({ post });
    const userID = post[0].userID;
    console.log(post[0].title);
    const [owner] = await pool.query(
      "SELECT firstName, lastName, profil_image from uzytkownicy WHERE id = ?",
      [userID]
    );

    // Pobierz listę obiektów z folderu w bucketcie S3
    const params = {
      Bucket: "rent-go",
      Prefix: `${post[0].title}/`,
    };

    const command = new ListObjectsV2Command(params);
    const s3Data = await s3Client.send(command);
    if (!s3Data.Contents) {
      console.log("No contents found in the specified folder");
    }
    const imageUrls = s3Data.Contents.map((item) => {
      return `https://rent-go.s3.eu-central-1.amazonaws.com/${item.Key}`;
    });

    return NextResponse.json({
      message: "czesc oto twoj post:)",
      post: post,
      owner: owner,
      images: imageUrls,
    });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "error",
    });
  }
}
