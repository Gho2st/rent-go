import Heading from "@/components/UI/heading/Heading";
import classes from "./page.module.css";

export default function Centrum() {
  return (
    <div className={classes.container}>
      <Heading text="Centrum Pomocy Rent&Go" />
      <p>
        Chcesz uzyskac pomoc? <br></br> Po prostu napisz do nas:<br></br>
        biosite.praca@gmail.com
      </p>
    </div>
  );
}
