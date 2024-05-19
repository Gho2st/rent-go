"use client";
import { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Posts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      setData(jsonData.posts); // Assuming your data structure has a "posts" property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Pick something for you!</h1>
      {loading && (
        <p className={classes.loading}>Wczytujemy ogłoszenia dla Ciebie...</p>
      )}
      <div className={classes.postsContainer}>
        {data.map((post, index) => (
          <Link href={"/posts/" + post.id}>
            <div className={classes.post} key={post.id}>
              <div className={classes.imgContainer}>
                <Image
                  alt={index}
                  width={250}
                  height={250}
                  src={post.imageurl}
                ></Image>
              </div>
              <h2>{post.title}</h2>
              <h4>{post.price} zł za dzień</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
