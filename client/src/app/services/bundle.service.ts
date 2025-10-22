import { Api } from "../config";
import { QuoteRequest } from "../types/bundle.types";


export const getActiveServices = async () => {
    try {
        const response = await Api.get("/dvm/services/active");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch services.");
    }
};



export const getQuote = async (
    packages: QuoteRequest["selectedPackages"]
) => {
    try {
        const response = await Api.post("/bundle-helper/preview", {
            selectedPackages: packages,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch quote.");
    }
};