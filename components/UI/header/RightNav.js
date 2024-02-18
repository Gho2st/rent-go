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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // event listener to the body when the component mounts
    document.body.addEventListener("click", handleClickOutside);

    // remove the event listener when the component unmounts

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  function menuClickHandler() {
    setIsMenuOpen(!isMenuOpen);
  }

  function chooseMenuLink() {
    setIsMenuOpen(false);
  }
  function AuthButton() {
    const { data: session } = useSession();

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
