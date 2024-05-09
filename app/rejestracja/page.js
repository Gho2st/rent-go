import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import Link from "next/link";
import classes from "./page.module.css";

export default function RegisterPage() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.headers}>
          <h1>
            Welcome back 
          </h1>
          <h2>Welcome back! Please enter your details</h2>
        </div>
        <Form />
        <Link href={"/logowanie"} className={classes.text}>Masz juz konto?</Link>
      </div>
    </>
  );
}
