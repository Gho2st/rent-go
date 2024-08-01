"use client";
import { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/UI/heading/Heading";

export default function Posts({ data }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <Heading text="Wybierz coś dla siebie!" />
      {loading && (
        <p className={classes.loading}>Wczytujemy ogłoszenia dla Ciebie...</p>
      )}
      <div className={classes.postsContainer}>
        {data.map((post, index) => (
          <Link href={"/posts/" + post.id} key={post.id}>
            <div className={classes.post}>
              <div className={classes.imgContainer}>
                <Image
                  alt={post.title}
                  width={250}
                  height={250}
                  src={post.imageurl}
                />
              </div>
              <h2>{post.title}</h2>
              <h4>{post.price} zł za dzień</h4>
              <h5 className={classes.loc}>{post.loc}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
