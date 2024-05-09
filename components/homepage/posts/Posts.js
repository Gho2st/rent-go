"use client";
import { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import Image from "next/image";

export default function Posts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.posts); // Assuming your data structure has a "posts" property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Pick something for you!</h1>
      <div className={classes.postsContainer}>
        {data.map((post, index) => (
          <div className={classes.post} key={index}>
            <div className={classes.imgContainer}>
              <Image
                alt="pierwszy post"
                width={250}
                height={250}
                src={post.imageurl}
              ></Image>
            </div>
            <h2>{post.title}</h2>
            <h4>{post.price} zł za dzień</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
