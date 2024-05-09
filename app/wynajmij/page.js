import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Rent from "./Rent";
import classes from './page.module.css'

export default async function wynajmij() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className={classes.container}>
      <Rent />
    </div>
  );
}
