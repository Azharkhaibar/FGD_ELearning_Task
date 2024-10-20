import axios from "axios";
interface RegisterResponse {
    message: string; 
}
export const SendRegisterData = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>('http://localhost:5001/register', {
            firstname,
            lastname,
            email,
            password,
        });
        return response.data; 
    } catch (error) {
        console.error("Error sending registration data:", error);
        throw error; 
    }
};

