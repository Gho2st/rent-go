import Link from "next/link";
import classes from "./Footer.module.css";
import { PiBirdBold } from "react-icons/pi";

export default function Footer() {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.topContainer}>
        <h5>Bądź na bieząco z najnowszymi informacjami.</h5>
        <div className={classes.input}>
          <input type="email" placeholder="Your email"></input>
          <div className={classes.icon}>
            <PiBirdBold />
          </div>
        </div>
      </div>
      <div className={classes.middleContainer}>
        <div className={classes.linksContainer}>
          <h6>Pages</h6>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
        </div>
        <div className={classes.linksContainer}>
          <h6>Pages</h6>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
        </div>
        <div className={classes.linksContainer}>
          <h6>Pages</h6>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
        </div>
        <div className={classes.linksContainer}>
          <h6>Pages</h6>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
          <Link href="/">Page 1</Link>
        </div>
        <div className={classes.linksContainer}>
          <h6>Zaobserwuj nas</h6>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
        </div>
      </div>
      <div className={classes.downContainer}>
        <h6>
          Realizacja projektu
          <Link href={"https://www.domiweb.pl/"}> Domiweb</Link>
        </h6>
        <p>Wszystkie prawa zastrzezone</p>
      </div>
    </div>
  );
}
