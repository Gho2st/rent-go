"use client";
import classes from "./RightNav.module.css";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function RightNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { data: session } = useSession();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   // Add the event listener to the document.body
  //   document.body.addEventListener("click", handleClickOutside);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutside);
  //   };
  // }, [menuRef]);

  function menuClickHandler() {
    setIsMenuOpen(!isMenuOpen);
  }

  function chooseMenuLink() {
    setIsMenuOpen(false);
  }
  function AuthButton() {
    if (session) {
      return (
        <>
          <button onClick={() => signOut()}>Wyloguj się</button>
        </>
      );
    }

    return (
      <>
        <button onClick={() => signIn()}>Zaloguj się </button>
      </>
    );
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
            <div className={classes.openMenuContainer} ref={menuRef}>
              <Link href={"/rejestracja"} onClick={chooseMenuLink}>
                Zarejestruj się
              </Link>
              <Link href={"/wynajmij"} onClick={chooseMenuLink}>
                Wynajmij swój pojazd na Rent&Go
              </Link>
              {session && <Link href={"/panel-uzytkownika"}>Panel uzytkownika</Link>}
              <Link href={"/rejestracja"} onClick={chooseMenuLink}>
                Centrum Pomocy
              </Link>
              <AuthButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
