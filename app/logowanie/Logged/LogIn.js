"use client";

import { useState } from "react";
import { useAuth } from "../../AuthContext";
import classes from "./LogIn.module.css";
import { signIn } from "next-auth/react";

export default function LogIn(props) {
  const { isLoggedIn, login, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Możesz obsłużyć odpowiedź serwera tutaj
        const token = data.token;
        // token is available --> proceed with login
        if (token) {
          login();
        }
      } else {
        console.error("Błąd podczas logowania");
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
    }
  };

 

  return isLoggedIn ? (
    <>
      <p className={classes.loggedP}>You are logged in.</p>
      <button>chcesz zmienic haslo?</button>
    </>
  ) : (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}
