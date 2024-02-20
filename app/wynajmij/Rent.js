"use client";
import classes from "./Rent.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";

export default function Rent() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const initialFormState = {
    title: "",
    description: "",
    selectedImages: [],
    price: null,
    dateRange: [null, null],
    phoneNumber: "",
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
        body: JSON.stringify({
          ...formState,
          userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("hej user id to ");
        console.log(userId);
        console.log(data.message); // Możesz obsłużyć odpowiedź serwera tutaj
      } else {
        console.error("Błąd przy dodawaniu ogłoszenia");
      }
    } catch (error) {
      console.error("Błąd przy dodawaniu ogłoszenia:", error);
    }

    // Perform form submission logic with formState
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
