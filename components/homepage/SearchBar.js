import { useState } from "react";
import classes from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import Posts from "./posts/Posts";

export default function SearchBar() {
  const [loc, setLoc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responseData, setResponseData] = useState([]);

  const handleSearch = async (loc, startDate, endDate) => {
    try {
      const params = new URLSearchParams({
        loc,
        startDate,
        endDate,
      }).toString();
      const response = await fetch(`/api/posts?${params}`);

      if (!response.ok) {
        throw new Error("Wystąpił błąd przy przetwarzaniu żądania");
      }

      const responseData = await response.json();
      setResponseData(responseData.posts); // Save the fetched data to state
      console.log("Response from server:", responseData);
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(loc, startDate, endDate);
  };

  return (
    <>
      <div className={classes.Container}>
        <form className={classes.searchDetails} onSubmit={handleSubmit}>
          <div className={classes.searchItem}>
            <label className={classes.label} htmlFor="loc">
              Miejsce
            </label>
            <input
              type="text"
              id="loc"
              placeholder="Wpisz miejsce..."
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          </div>
          <div className={classes.searchItem}>
            <label className={classes.label} htmlFor="startDate">
              Początek
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={classes.searchItem}>
            <label className={classes.label} htmlFor="endDate">
              Koniec
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={classes.searchIcon}>
            <button type="submit">
              <IoSearch />
            </button>
          </div>
        </form>
      </div>
      <div>
        <Posts data={responseData} />
      </div>
    </>
  );
}
