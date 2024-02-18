import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Rent from "./Rent";

export default async function wynajmij() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <Rent/>
    </div>
  );
}