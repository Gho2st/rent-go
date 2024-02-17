"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Sprawdzenie, czy w localStorage istnieje informacja o zalogowaniu
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Sprawdzenie, czy w localStorage istnieje informacja o zalogowaniu
  const initialLoggedInState = isLocalStorageAvailable
    ? localStorage.getItem("isLoggedIn") === "true"
    : false;

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
  const [isLoginForm, setIsLoginForm] = useState(false); 

  const login = () => {
    setIsLoggedIn(true);
    // Zapisanie informacji o zalogowaniu do localStorage
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Usunięcie informacji o zalogowaniu z localStorage
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    // Zapisanie aktualnego stanu logowania do localStorage po każdej zmianie
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoginForm, setIsLoginForm }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
