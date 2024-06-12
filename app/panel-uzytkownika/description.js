"use client";
import { useState, useEffect } from "react";
import classes from "./description.module.css";
import Button from "@/components/UI/button/button";
import { CiStickyNote } from "react-icons/ci";

export default function Description(props) {
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userEmail = props.userEmail;
  const [loading, setLoading] = useState(true);
  const [editDescription, setEditDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) {
          throw new Error("Brak dostępu do identyfikatora użytkownika");
        }
        const response = await fetch("/api/user-info", {
          method: "POST",
          body: JSON.stringify({ email: userEmail }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setDescription(jsonData.data.opis);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    try {
      const response = await fetch("/api/description", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd przy przetwarzaniu żądania");
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      setEditDescription(false);
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
    }
  };

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const editDescriptionHandler = () => {
    setEditDescription(!editDescription);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <p className={classes.description}>{description}</p>
      <p className={classes.editDescription} onClick={editDescriptionHandler}>
        Edytuj opis <CiStickyNote />
      </p>

      {editDescription && (
        <div className={classes.content}>
          <h2>Wpisz swój opis</h2>
          <textarea
            name="description"
            value={description}
            onChange={changeDescriptionHandler}
          ></textarea>
          <Button onClick={handleSubmit} text="Zatwierdź" />
        </div>
      )}
    </div>
  );
}
