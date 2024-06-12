"use client";
import classes from "./person.module.css";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import Image from "next/image";

export default function Person(props) {
  const [isImage, setIsImage] = useState(false);

  return (
    <div className={classes.profile}>
      <h1 className={classes.name}>{props.name}</h1>
      {isImage && (
        <Image
          alt="zdjecie profilowe uzytkownika"
          src={props.image}
          width={50}
          height={50}
        />
      )}
    </div>
  );
}
