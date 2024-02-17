"use client";
import classes from "./page.module.css";
import Rent from "./Rent";
import { useAuth } from "../AuthContext";

export default function wynajmij() {
  const { setIsLoginForm, isLoginForm, isLoggedIn } = useAuth();

  return <div>{isLoggedIn ? <Rent/> : <p>zaloguj sie</p>}</div>;
}
