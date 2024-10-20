import { useState } from "react";

export const useCourseForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const ResetCourseForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
  };
  return {
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    ResetCourseForm,
  };
};
