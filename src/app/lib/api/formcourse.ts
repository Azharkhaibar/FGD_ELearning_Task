import axios from "axios";
import { FORM_COURSE_ENDPOINT } from "../constant/fromcourse_endpoint";

export const SendDataFreeCourse = async (name: string, email: string, phone_number: string) => {
  try {
    const response = await axios.post(FORM_COURSE_ENDPOINT, {
      name,
      email,
      phone_number,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred while sending data.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
