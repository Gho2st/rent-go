"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "./Rent.module.css";

const Rent = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const initialFormState = {
    title: "",
    name: "",
    price: null,
    userID: userId,
    mainUrl: "",
  };

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState([]); // Move urls state to a higher scope

  const handleFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
  };
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      title: newTitle,
    }));
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      name: newName,
    }));
  };
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      price: newPrice,
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
        console.log(userId);
        // Set mainUrl as the first element of uploadedUrls
        const mainUrl = urls[0];

        // Clone formState and set mainUrl
        const dataToSend = {
          ...formState,
          mainUrl: mainUrl,
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
        <div className={classes.headers}>
          <h1>Wynajmij swój samochod z Rent&Go</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <label>
            Tytuł
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleTitleChange}
            ></input>
          </label>
          <label>
            Imię / Nazwa Firmy
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleNameChange}
            ></input>
          </label>
          <label>
            Cena za dobę
            <input
              type="number"
              id="price"
              name="price"
              value={formState.price}
              onChange={handlePriceChange}
            ></input>
          </label>
          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Rent;
