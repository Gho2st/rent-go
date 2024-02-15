"use client";

import { useState } from "react";
import classes from "./SignIn.module.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat:"",
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
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Możesz obsłużyć odpowiedź serwera tutaj
      } else {
        console.error("Błąd rejestracji");
      }
    } catch (error) {
      console.error("Błąd rejestracji:", error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
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
        <br />
        <label>
          Powtórz Hasło:
          <input
            type="password"
            name="passwordRepeat"
            value={formData.passwordRepeat}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}
