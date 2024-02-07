'use client'
import classes from "./Header.module.css";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import RightNav from "./RightNav";

export default function Header() {

  function menuClickHandler(){
    console.log("clicked")
  }



  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <Link href={"/"}>Rent&Go</Link>
      </div>
      <div className={classes.middleNav}>
        <Link href={"/jak-to-dziala"}>Jak to działa</Link>
        <Link href={"/o-firmie"}>O firmie</Link>
        <Link href={"/wspolpraca"}>Współpraca</Link>
      </div>
      <RightNav/>
    </div>
  );
}
