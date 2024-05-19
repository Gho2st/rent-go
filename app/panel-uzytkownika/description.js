"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import classes from "./description.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";

export default function Description() {
  const [description, setDescription] = useState("Opis");
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  console.log(session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/description`, {
        method: "POST",
        body: JSON.stringify({
          dbID: session.user.dbID,
          description: description,
        }),
      });
      setShowModal(false);
      window.location.reload();
      if (!response.ok) {
        throw new Error("Wystąpił błąd przy przetwarzaniu żądania");
      }
      const responseData = await response.json();
      console.log("Dane z serwera:", responseData);
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
    <div>
      <p>{session.user.descriptionDB}</p>
      <p onClick={handleOpenModal}>Edytuj opis</p>

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
            <h2>Wpisz swoj opis</h2>
            <textarea
              name="description"
              value={description}
              onChange={changeDescriptionHandler}
            ></textarea>
            <button onClick={handleSubmit}>Zatwierdź</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
