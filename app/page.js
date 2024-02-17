"use client";
import styles from "./page.module.css";
import Homepage from "@/components/homepage/Homepage";
import { useAuth } from "./AuthContext";
import LogIn from "@/components/Logged/LogIn";

export default function Home() {
  const { setIsLoginForm, isLoginForm, isLoggedIn } = useAuth();

  return isLoginForm ? <LogIn /> : <Homepage />;
}
