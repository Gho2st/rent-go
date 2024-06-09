"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import classes from "./description.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import Button from "@/components/UI/button/button";
import { CiStickyNote } from "react-icons/ci";

export default function Description() {
  const [description, setDescription] = useState("Opis");
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  // Use useEffect to set the initial description from session
  useEffect(() => {
    if (session?.user?.descriptionDB) {
      setDescription(session.user.descriptionDB);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/description`, {
        method: "POST",
        body: JSON.stringify({
          dbID: session.user.dbID,
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
      console.log("Dane z serwera:", responseData);

      // Update the session's user description locally
      session.user.descriptionDB = description;
      setShowModal(false);
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
    }
  };

  function changeDescriptionHandler(event) {
    setDescription(event.target.value);
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.container}>
      <p className={classes.description}>{description}</p>
      <p onClick={handleOpenModal} className={classes.editDescription}>
        Edytuj opis <CiStickyNote />
      </p>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Pełna treść"
        className={classes.modal}
      >
        <div className={classes.modalContent}>
          <div onClick={handleCloseModal} className={classes.closeButton}>
            <IoIosCloseCircleOutline className={classes.icon} />
          </div>
          <div className={classes.content}>
            <h2>Wpisz swój opis</h2>
            <textarea
              name="description"
              value={description}
              onChange={changeDescriptionHandler}
            ></textarea>
            <Button onClick={handleSubmit} text="Zatwierdź" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
