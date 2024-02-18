"use client";

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
        lastName: formData.get("lastName")
      }),
    });
    console.log({ response });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" type="text" />
      <input name="lastName" type="text" />
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
}
