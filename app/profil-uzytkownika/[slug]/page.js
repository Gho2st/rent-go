"use client";
import classes from "./page.module.css";
import { useState, useEffect } from "react";
export default function page({ params }) {
  const [fetchedData, setFetchedData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          id: params.slug,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setFetchedData(responseData.data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className={classes.container}>
      {fetchedData && (
        <div>
          <h1>{fetchedData.firstName}</h1>
          <p>{fetchedData.opis}</p>
        </div>
      )}
    </div>
  );
}
