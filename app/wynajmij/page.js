import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Rent from "./Rent";
import classes from "./page.module.css";
import Image from "next/image";
import Heading from "@/components/UI/heading/Heading";

export default async function wynajmij() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className={classes.container}>
      <Heading text="Wynajmij swój samochód z Rent&Go" />
      <div className={classes.formContainer}>
        <Rent />
        <div className={classes.imageContainer}>
          <Image
            src={"/carRent.jpg"}
            width={500}
            height={800}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
