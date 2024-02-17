"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./page.module.css";


export default function wynajmij() {

  const initialFormState = {
    title: "",
    description: "",
    selectedImages: [],
    price: null,
    dateRange: [null, null],
    mileage: null,
    brand: "",
    model: "",
    productionYear: null,
    rentPlace: "",
    phoneNumber: "",
    seatsNumber: null,
    engine: "",
    enginePower: null,
  };
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (formState.selectedImages.length + files.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }

    handleInputChange("selectedImages", [
      ...formState.selectedImages,
      ...files,
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Możesz obsłużyć odpowiedź serwera tutaj
      } else {
        console.error("Błąd przy dodawaniu ogłoszenia");
      }
    } catch (error) {
      console.error("Błąd przy dodawaniu ogłoszenia:", error);
    }

    // Perform form submission logic with formState
    console.log("Form State:", formState);
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
            onChange={(e) => handleInputChange("title", e.target.value)}
          ></input>
        </label>
        <label>
          Opis
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
          ></input>
        </label>
        <label>
          Cena za dzień
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => handleInputChange("price", e.target.value)}
          ></input>
        </label>
        <label>
          Przebieg
          <input
            type="number"
            name="mileage"
            id="mileage"
            onChange={(e) => handleInputChange("mileage", e.target.value)}
          ></input>
        </label>
        <label>
          Marka
          <input
            type="text"
            name="brand"
            id="brand"
            onChange={(e) => handleInputChange("brand", e.target.value)}
          ></input>
        </label>
        <label>
          Model
          <input
            type="text"
            name="model"
            id="model"
            onChange={(e) => handleInputChange("model", e.target.value)}
          ></input>
        </label>
        <label>
          Rok produkcji
          <input
            type="number"
            name="productionYear"
            id="productionYear"
          ></input>
        </label>
        <label>
          Ilość miejsc
          <input
            type="number"
            name="seatsNumber"
            id="seatsNumber"
            onChange={(e) => handleInputChange("seatsNumber", e.target.value)}
          ></input>
        </label>
        <label>
          Miejsce wynajmu
          <input
            type="text"
            name="rentPlace"
            id="rentPlace"
            onChange={(e) => handleInputChange("rentPlace", e.target.value)}
          ></input>
        </label>
        <label>
          Silnik
          <input
            type="text"
            name="engine"
            id="engine"
            onChange={(e) => handleInputChange("engine", e.target.value)}
          ></input>
        </label>
        <label>
          Moc silnika
          <input
            type="number"
            name="enginePower"
            id="enginePower"
            onChange={(e) => handleInputChange("enginePower", e.target.value)}
          ></input>
        </label>
        <label>
          Numer telefonu
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
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
            startDate={formState.dateRange[0]}
            endDate={formState.dateRange[1]}
            onChange={(update) => handleInputChange("dateRange", update)}
          />
        </label>

        <button type="submit">Wynajmij</button>
      </form>
    </div>
  );
}
