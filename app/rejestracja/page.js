import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  
  return (
    <>
      <Form />
      <Link href={"/logowanie"}>Masz juz konto?</Link>
    </>
  );
}
