"use client";
import classes from "./form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogin } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  const handleSubmitGithub = async (e) => {
    e.preventDefault();
    const response = await signIn("github", { redirect: false });
    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  const handleSubmitFacebook = async (e) => {
    e.preventDefault();
    const response = await signIn("facebook", { redirect: false });
    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label htmlFor="email">
            Email
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              id="password"
              type="password"
              placeholder="password"
            />
          </label>
          <button type="submit">
            Login <MdLogin className={classes.icon} />
          </button>
        </form>
        <div className={classes.buttonsContainer}>
          <button className={classes.githubButton} onClick={handleSubmitGithub}>
            <FaGithub className={classes.icon}/>
            Logowanie przez github
          </button>
          <button
            className={classes.facebookButton}
            onClick={handleSubmitFacebook}
          >
            <FaFacebook className={classes.icon} />
            Logowanie przez facebook
          </button>
        </div>
      </div>
    </>
  );
}
