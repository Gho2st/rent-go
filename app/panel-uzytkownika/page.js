import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function wynajmij() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1>Hi, this is your dashboard bro enjoy it!</h1>
    </div>
  );
}