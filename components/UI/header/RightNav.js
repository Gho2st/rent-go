"use client";
import classes from "./RightNav.module.css";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function RightNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function menuClickHandler() {
    setIsMenuOpen(!isMenuOpen);
    console.log("clicked");
  }

  return (
    <>
      <div className={classes.Container}>
        <div className={classes.rightNav}>
          <div className={classes.avatarContainer} onClick={menuClickHandler}>
            <RxHamburgerMenu className={classes.burger} />
            <RxAvatar />
          </div>
          {isMenuOpen && (
            <div className={classes.openMenuContainer}>
              <Link href={"/rejestracja"}>Zarejestruj się</Link>
              <Link href={"/rejestracja"}>Zaloguj się</Link>
              <Link href={"/rejestracja"}>Wynajmij swój pojazd na Rent&Go</Link>
              <Link href={"/rejestracja"}>Centrum Pomocy</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
