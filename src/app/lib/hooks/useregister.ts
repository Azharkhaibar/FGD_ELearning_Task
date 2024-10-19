import { useState } from "react";
export const useRegisterForm = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return {
        firstname, lastname, email, password, resetForm, setFirstName, 
        setLastName, setEmail, setPassword
    }
}