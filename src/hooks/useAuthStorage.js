import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext"; // Adjust path if needed

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
