import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import classes from "./page.module.css";
import Description from "./description";
import UserPosts from "./UserPosts";
import Person from "./person";
import SwitchLogic from "./switchLogic";

export default async function panel() {
  const session = await getServerSession();

  console.log("ponizej dane z sesji");
  console.log(session);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className={classes.container}>
      <div>
        <Person
          name={session.user.name}
          image={session.user.image}
          userEmail={session.user.email}
        />
        <p>0.0 (0 ocen)</p>
        <Description userEmail={session.user.email} />
      </div>
      <SwitchLogic userEmail={session.user.email} />
    </div>
  );
}
