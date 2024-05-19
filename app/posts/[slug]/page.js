"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import classes from "./page.module.css";
import { IoMdContact } from "react-icons/io";
import Link from "next/link";

export default function Post({ params }) {
  const [fetchedData, setFetchedData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [postImages, setPostImages] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({
          id: params.slug,
        }),
      });
      const data = await response.json();
      console.log(data);
      const owner = data.owner[0];
      if (owner.lastName) {
        const name = owner.firstName + " " + owner.lastName;
        setOwner(name);
      } else {
        const name = owner.firstName;
        setOwner(name);
      }
      const image = owner.profil_image;
      setProfileImage(image);
      console.log(owner);
      const post = data.post[0];
      setFetchedData(post);
      const postImages = data.images;
      console.log(postImages);
      setPostImages(postImages);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className={classes.container}>
      {!fetchedData && (
        <div className={classes.loadingContainer}>
          <p className={classes.loading}>Wczytujemy ogłoszenie dla ciebie...</p>
        </div>
      )}

      {fetchedData && (
        <>
          <h1>{fetchedData.title}</h1>
          {postImages &&
            postImages.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                width={250}
                height={250}
              />
            ))}
          <h2>{fetchedData.price}</h2>
          <Link href={"/profil-uzytkownika/" + fetchedData.userID} hej="hej">
            <h3>Wlascicielem jest {owner}</h3>
          </Link>
          {profileImage ? (
            <Image
              alt="zdjecie profilowe"
              width={50}
              height={50}
              src={profileImage}
            />
          ) : (
            <IoMdContact />
          )}
          <h4>Opinie</h4>
          <h5>Lokalizacja pojazdu</h5>
          <div className={classes.info}>
            <p>Więcej informacji</p>
            <p>jakis opis heh fajny autko woz</p>
          </div>
          <div className={classes.listContainer}>
            <ul>
              <li>
                <div>Rodzaj paliwa</div>
                <div>Benzyna</div>
              </li>
              <li>
                <div>Typ nadwozia</div>
                <div>kabriolet</div>
              </li>
              <li>
                <div>Liczba miejsc</div>
                <div>2</div>
              </li>
              <li>
                <div>Skrzynia biegów</div>
                <div>manualna</div>
              </li>
              <li>
                <div>Kolor nadwozia</div>
                <div>czerwony</div>
              </li>
              <li>
                <div>Rok produkcji</div>
                <div>2002</div>
              </li>
              <li>
                <div>Przebieg (km)</div>
                <div>192 000 km</div>
              </li>
              <li>
                <div>Masa własna (kg)</div>
                <div>1.100</div>
              </li>
              <li>
                <div>Moc silnika</div> <div>135 km</div>
              </li>
              <li>
                <div>Średnie spalanie</div>
                <div>6l/100km</div>
              </li>
              <li>
                <div>Pojemność zbiornika paliwa (l)</div>
                <div>45 l</div>
              </li>
              <li>
                <div>Pojemność silnika</div>
                <div>1.998 ccm</div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
