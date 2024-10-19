import axios from "axios";

// Definisikan interface untuk data respons
interface RegisterResponse {
    message: string; // atau atribut lain yang Anda harapkan
}

// Ubah fungsi SendRegisterData dengan tipe yang lebih spesifik
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

        return response.data; // Mengembalikan data dari server
    } catch (error) {
        console.error("Error sending registration data:", error);
        throw error; // Melempar kesalahan agar bisa ditangani di tempat lain
    }
};

