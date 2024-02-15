"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./page.module.css";

export default function wynajmij() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [price, setPrice] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }

    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Images:", selectedImages);
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
  };

  return (
    <div className={classes.rentContainer}>
      <h1>Wynajmij swoj pojazd na Rent&Go</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label>
          Tytuł
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleTitleChange}
          ></input>
        </label>
        <label>
          Opis
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleDescriptionChange}
          ></input>
        </label>
        <label>
          Cena
          <input
            type="number"
            name="price"
            id="price"
            onChange={handlePriceChange}
          ></input>
        </label>
        <label>
          Dodaj zdjęcia (max 8)
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
        <label>
          Wybierz datę dostępności
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
          />
        </label>

        <button type="submit">Wynajmij</button>
      </form>
    </div>
  );
}
