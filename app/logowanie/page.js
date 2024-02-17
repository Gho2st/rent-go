'use client'
import LogIn from "./Logged/LogIn";
import classes from "./page.module.css";
import { useAuth } from "../AuthContext";

export default function logowanie() {
  const { setIsLoginForm, isLoginForm, isLoggedIn } = useAuth();
  return (
    <>
      <LogIn />
    </>
  );
}
