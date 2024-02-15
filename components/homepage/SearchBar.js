import classes from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import { InputHTMLAttributes } from "react";

export default function SearchBar() {
  return (
    <div className={classes.Container}>
      <form className={classes.searchDetails}>
        <div className={classes.searchItem}>
          <label className={classes.label} htmlFor="placeInput">
            Miejsce
          </label>
          <input type="text" id="placeInput" placeholder="Wpisz miejsce..." />
        </div>
        <div className={classes.searchItem}>
          <label className={classes.label} htmlFor="startDateInput">
            Początek
          </label>
          <input
            type="date"
            id="startDateInput"
            placeholder="Wpisz miejsce..."
          />
        </div>
        <div className={classes.searchItem}>
          <label className={classes.label} htmlFor="endDateInput">
            Koniec
          </label>
          <input
            type="date"
            id="endDateInput"
            placeholder="Wpisz miejsce..."
          />
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
