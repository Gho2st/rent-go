import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import Link from "next/link";
import classes from "./page.module.css";
import { FaCar } from "react-icons/fa6";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.headers}>
          <h1>
            Welcome back <FaCar  />
          </h1>
          <h2>Welcome back! Please choose your provider.</h2>
        </div>
        <Form />
        <Link className={classes.text} href={"/rejestracja"}>
          Nie masz jeszcze konta?
        </Link>
      </div>
    </>
  );
}
