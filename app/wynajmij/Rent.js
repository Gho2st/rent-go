"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "./Rent.module.css";
import Button from "@/components/UI/button/button";

const Rent = () => {
  const { data: session } = useSession();
  console.log(session.user);
  const userId = session?.user?.dbID;
  console.log(userId);
  const initialFormState = {
    title: "",
    loc: "",
    description: "",
    price: null,
    mainUrl: "",
    fuel: "",
    type: "",
    seats: null,
    gear: "",
    color: "",
    mileage: null,
    production: null,
    power: null,
    fuelUsage: null,
    engine: null,
  };

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState([]); // Move urls state to a higher scope

  const handleFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", formState.title);
        const response = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
        console.log(data.success);
        if (data.success === true) {
          setSuccess(true);
        }

        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log(uploadedUrls);
      setUrls(uploadedUrls); // Set urls state with the uploaded URLs
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (success && urls.length > 0) {
      const sendToApi = async () => {
        console.log("wyslane do add api");
        console.log(session.user.dbID);
        // Set mainUrl as the first element of uploadedUrls
        const mainUrl = urls[0];

        // Clone formState and set mainUrl
        const dataToSend = {
          ...formState,
          mainUrl: mainUrl,
          userID: userId,
        };
        console.log(dataToSend);
        const saveResponse = await fetch("/api/add", {
          method: "POST",
          body: JSON.stringify(dataToSend),
        });

        const saveData = await saveResponse.json();
      };

      sendToApi();
    }
  }, [success, urls]);

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label>
            Wybierz zdjęcia (max 8)
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </label>
          <label>
            Tytuł
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Opis
            <textarea
              id="description"
              name="description"
              placeholder="Przekonaj potencjalnego klienta do swojego samochodu! (max 500 słów)."
              value={formState.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Cena za dobę
            <input
              type="number"
              id="price"
              name="price"
              value={formState.price}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Lokalizacja
            <input
              type="text"
              id="loc"
              name="loc"
              value={formState.loc}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Rodzaj paliwa
            <select
              id="fuel"
              name="fuel"
              value={formState.fuel}
              onChange={handleInputChange}
            >
              <option value="benzyna">Benzyna</option>
              <option value="diesel">Diesel</option>
              <option value="gaz">Gaz</option>
              <option value="hybryda">Hybryda</option>
            </select>
          </label>

          <label>
            Typ nadwozia
            <select
              id="type"
              name="type"
              value={formState.type}
              onChange={handleInputChange}
            >
              <option value="sedan">Sedan</option>
              <option value="combi">Combi</option>
              <option value="suv">Suv</option>
              <option value="van">Van</option>
            </select>
          </label>
          <label>
            Liczba miejsc
            <input
              type="number"
              id="seats"
              name="seats"
              value={formState.seats}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Skrzynia biegów
            <select
              id="gearbox"
              name="gearbox"
              value={formState.gearbox}
              onChange={handleInputChange}
            >
              <option value="manualna">Manualna</option>
              <option value="automatyczna">Automatyczna</option>
            </select>
          </label>
          <label>
            Kolor nadwozia
            <input
              type="text"
              id="color"
              name="color"
              value={formState.color}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Rok produkcji
            <input
              type="number"
              id="production"
              name="production"
              value={formState.production}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Przebieg
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formState.mileage}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Moc silnika
            <input
              type="number"
              id="power"
              name="power"
              value={formState.power}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Średnie spalanie
            <input
              type="number"
              id="fuelUsage"
              name="fuelUsage"
              value={formState.fuelUsage}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Pojemność silnika
            <input
              type="number"
              id="engine"
              name="engine"
              value={formState.engine}
              onChange={handleInputChange}
            ></input>
          </label>
          <Button text={uploading ? "Przesyłanie..." : "Prześlij"} />
        </form>
      </div>
    </>
  );
};

export default Rent;
