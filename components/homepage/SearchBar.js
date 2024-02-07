import classes from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import { InputHTMLAttributes } from "react";

export default function SearchBar() {
  return (
    <div className={classes.Container}>
      <form className={classes.searchDetails}>
        <div className={classes.searchItem}>
          <label className={classes.label} htmlFor="placeInput">
            Miejsce:
          </label>
          <input type="text" id="placeInput" placeholder="Wpisz miejsce..." />
        </div>
        <div className={classes.searchItem}>
          <h3>Początek</h3>
          <p>Wrz 4, 11:00</p>
        </div>
        <div className={classes.searchItem}>
          <h3>Koniec</h3>
          <p>Wrz 4, 11:00</p>
        </div>
        <div className={classes.searchIcon}>
          <button type="submit">
            <IoSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
