"use client";
import Link from "next/link";
import classes from "./button.module.css";
import { motion } from "framer-motion";

export default function Button(props) {
  const { link, text, onClick } = props;

  return (
    <>
      {link ? (
        <Link className={classes.button} href={link}>
          {text}
        </Link>
      ) : (
        <button onClick={onClick} className={classes.button}>
          {text}
        </button>
      )}
    </>
  );
}
