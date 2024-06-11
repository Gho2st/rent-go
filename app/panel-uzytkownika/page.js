import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import classes from "./page.module.css";
import Image from "next/image";
import Description from "./description";
import UserPosts from "./UserPosts";

export default async function wynajmij() {
  const session = await getServerSession();

  console.log("ponizej dane z sesji");
  console.log(session);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.profile}>
          <h1 className={classes.name}>{session.user.name}</h1>
          <Image
            alt="zdjecie profilowe uzytkownika"
            src={session.user.image}
            width={50}
            height={50}
          />
        </div>
        <p>0.0 (0 ocen)</p>
        <Description />
      </div>
      <UserPosts userEmail={session.user.email} />
    </div>
  );
}
