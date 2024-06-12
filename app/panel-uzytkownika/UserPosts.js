"use client";
import classes from "./UserPosts.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserPosts(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = props.userEmail;
  console.log(userEmail);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //   Sprawdzenie, czy sesja użytkownika jest dostępna
      if (!userEmail) {
        throw new Error("Brak dostępu do identyfikatora użytkownika");
      }
      const response = await fetch("/api/user-posts", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setLoading(false);
      setPosts(jsonData.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className={classes.container}>
      <h2>Twoje posty</h2>
      {loading && (
        <p className={classes.loading}>Wczytujemy ogłoszenia dla Ciebie...</p>
      )}
      <div className={classes.postsContainer}>
        {posts.map((post, index) => (
          <Link href={"/posts/" + post.id} key={post.id}>
            <div className={classes.post}>
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
        {!posts && <p>brak postow</p>}
      </div>
    </div>
  );
}
