"use client";
import classes from "./switchLogic.module.css";
import UserFavPosts from "./UserFavPosts";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";

export default function SwitchLogic(props) {
  const [isUserPostsShowed, setIsUserPostsShowed] = useState(true);
  const [isFavPostsShowed, setIsFavPostsShowed] = useState(false);

  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const response = await fetch(
          `/api/user-fav-all?postID=&userEmail=${props.userEmail}`
        );
        const data = await response.json();
        console.log("dane z get po stronie klienta");
        setIsFavPostsShowed(data.isFavPostsShowed);
        console.log(isFavPostsShowed);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    }
    fetchFavoriteStatus();
  }, [props.userEmail]);

  return (
    <>
      <div className={classes.switchPostsContainer}>
        <h2
          onClick={() => {
            setIsUserPostsShowed(!isUserPostsShowed);
          }}
        >
          Twoje posty
        </h2>
        <h2
          onClick={() => {
            setIsFavPostsShowed(!isFavPostsShowed);
          }}
        >
          Ulubione posty
        </h2>
      </div>
      {isUserPostsShowed && <UserPosts userEmail={props.userEmail} />}
      {isFavPostsShowed && <UserFavPosts />}
    </>
  );
}
