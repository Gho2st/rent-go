import Button from "@/components/UI/button/button";
import classes from "./not-found.module.css";
import { FaCarCrash } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className={classes.container}>
      <h1>404 - Strona nie znaleziona</h1>
      <p>PS: Często dzieje się tak przy literówce w adresie URL.</p>
      <FaCarCrash />
      <Button text="Przejdź do strony głównej" link="/" />
    </div>
  );
}
