import { Api } from "../config";

export const getVerificationMessage = async () => {
    try {
        const response = await Api.get("/user/verification-message");
        if (!response?.data) throw new Error("Empty response from server.");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch verification message.");
    }
};

export const login = async (walletAddress: string, signature: string) => {
    try {
        const response = await Api.post("/user/login", { walletAddress, signature });
        if (!response?.data) throw new Error("Empty response from server.");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch verification message.");
    }
}


export const getProfile = async () => {
    try {
        const response = await Api.get("/user/profile");
        if (!response?.data) throw new Error("Empty response from server.");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch profile.");
    }
};

