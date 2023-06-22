// Importing AuthContext hook from AuthContext
import { AuthContext } from "../context/AuthContext";
// Importing useContext hook from React
import { useContext } from "react";

// Access the authentication context provided by AuthContextProvider
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }

  return context;
}