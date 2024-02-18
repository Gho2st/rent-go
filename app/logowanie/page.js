import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import Link from "next/link";
import classes from "./page.module.css";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Form />
      <Link className={classes.text} href={"/rejestracja"}>
        Nie masz jeszcze konta?
      </Link>
    </>
  );
}
