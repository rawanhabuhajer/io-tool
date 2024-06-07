import { useContext } from "react";  // Corrected import
import { AuthContext } from "../context/AuthContext";

export const UseAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('Using AuthContext must be inside AuthProvider');
    }

    return context;
};

