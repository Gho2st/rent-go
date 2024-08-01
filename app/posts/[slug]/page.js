"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import classes from "./page.module.css";
import { IoMdContact } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Post({ params }) {
  const [fetchedData, setFetchedData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [postImages, setPostImages] = useState(null);
  const [isFavPost, setIsFavPost] = useState(false);

  const { data: session } = useSession();
  console.log(session.user);
  const userEmail = session?.user?.email;
  console.log(userEmail);
  console.log(params.slug)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(isFavPost);
  }, [isFavPost]);

  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const response = await fetch(
          `/api/user-fav?postID=${params.slug}&userEmail=${userEmail}`
        );
        const data = await response.json();
        console.log("dane z get po stronie klienta")
        setIsFavPost(data.isFavPost);
        console.log(isFavPost)
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    }

    fetchFavoriteStatus();
  }, [params.slug, userEmail]);

  const handleFavPost = async () => {
    const newFavStatus = !isFavPost;
    setIsFavPost(newFavStatus);
    await fetchFavData(newFavStatus);
  };

  const fetchFavData = async (newFavStatus) => {
    try {
      await fetch("/api/user-fav", {
        method: "POST",
        body: JSON.stringify({
          isFavPost: newFavStatus,
          postID: params.slug,
          userEmail: userEmail,
        }),
      });
    } catch (error) {
      console.error("error updating favourite post", error);
    }
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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
          <div className={classes.topContainer}>
            <h1>{fetchedData.title}</h1>
            {isFavPost ? (
              <FaHeart onClick={handleFavPost} />
            ) : (
              <FaRegHeart onClick={handleFavPost} />
            )}
          </div>
          <p>Lokalizacja pojazdu {fetchedData.loc}</p>
          <h2>Opinie</h2>
          <div className={classes.imageContainer}>
            {postImages &&
              postImages.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index}`}
                  width={330}
                  height={330}
                  className={classes.image}
                />
              ))}
          </div>
          <div className={classes.onwerContainer}>
            {profileImage ? (
              <div className={classes.iconContainer}>
                <Link href={"/profil-uzytkownika/" + fetchedData.userID}>
                  <Image
                    alt="zdjecie profilowe"
                    width={50}
                    height={50}
                    src={profileImage}
                    className={classes.profileImage}
                  />
                </Link>
                <div>
                  <h2>Wlascicielem jest {owner}</h2>
                  <p>Oceniany na: 5.0</p>
                </div>
              </div>
            ) : (
              <div className={classes.iconContainer}>
                <Link href={"/profil-uzytkownika/" + fetchedData.userID}>
                  <IoMdContact className={classes.icon} />
                </Link>
                <div>
                  <h2>Wlascicielem jest {owner}</h2>
                  <p>Oceniany na: 5.0</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3>Pojazd dostepny w dniach:</h3>
            <p>od {formatDate(fetchedData.startDate)}</p>
            <p>do {formatDate(fetchedData.endDate)}</p>
          </div>

          <div className={classes.info}>
            <p>Więcej informacji</p>
            <p>{fetchedData.description}</p>
          </div>
          <div className={classes.listContainer}>
            <ul>
              <li>
                <div>Rodzaj paliwa</div>
                <div>{fetchedData.fuel}</div>
              </li>
              <li>
                <div>Typ nadwozia</div>
                <div>{fetchedData.type}</div>
              </li>
              <li>
                <div>Liczba miejsc</div>
                <div>{fetchedData.seats}</div>
              </li>
              <li>
                <div>Skrzynia biegów</div>
                <div>{fetchedData.gear}</div>
              </li>
              <li>
                <div>Kolor nadwozia</div>
                <div>{fetchedData.color}</div>
              </li>
              <li>
                <div>Rok produkcji</div>
                <div>{fetchedData.production}</div>
              </li>
              <li>
                <div>Przebieg (km)</div>
                <div>{fetchedData.mileage} km</div>
              </li>
              <li>
                <div>Moc silnika</div> <div>{fetchedData.power} km</div>
              </li>
              <li>
                <div>Średnie spalanie</div>
                <div>{fetchedData.fuelUsage}l/100km</div>
              </li>
              <li>
                <div>Pojemność silnika</div>
                <div>{fetchedData.engine} ccm</div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
