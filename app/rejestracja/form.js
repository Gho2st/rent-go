"use client";
import classes from "./form.module.css";
import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      }),
    });
    console.log({ response });
  };
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <label htmlFor="firstName">
        Imię
        <input name="firstName" type="text" />
      </label>
      <label htmlFor="lastName">
        Nazwisko
        <input name="lastName" type="text" />
      </label>
      <label htmlFor="email">
        Email
        <input name="email" type="email" />
      </label>
      <label htmlFor="password">
      Hasło
        <input name="password" type="password" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
