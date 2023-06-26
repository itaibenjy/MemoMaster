// Importing the AuthContext and useContext hooks from their respective modules
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Defining a custom hook called useAuthContext
export const useAuthContext = () => {
  // Using the useContext hook to get the current value of the AuthContext
  const context = useContext(AuthContext);

  // If the context is null or undefined, throw an error
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }

  // Return the context
  return context;
}