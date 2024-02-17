"use client";
import classes from "./RightNav.module.css";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState} from "react";
import { useAuth } from "@/app/AuthContext";

export default function RightNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, login, logout, setIsLoginForm  } = useAuth();

  

  function menuClickHandler() {
    setIsMenuOpen(!isMenuOpen);
  }

  function chooseMenuLink(){
    setIsMenuOpen(false)
  }

  function handleIsLoginFormChange(){
    console.log('click')
    setIsLoginForm(true)
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
              <Link href={"/rejestracja"} onClick={chooseMenuLink}>Zarejestruj się</Link>
              {isLoggedIn && <Link href={"/logowanie"} onClick={chooseMenuLink}>Panel uzytkownika</Link>}
              <Link href={"/logowanie"} onClick={chooseMenuLink}>Zaloguj się</Link>
              <Link href={"/wynajmij"} onClick={chooseMenuLink}>Wynajmij swój pojazd na Rent&Go</Link>
              <Link href={"/rejestracja"} onClick={chooseMenuLink}>Centrum Pomocy</Link>
              {isLoggedIn && <button onClick={logout} >wyloguj sie</button>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
