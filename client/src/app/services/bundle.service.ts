import { Api } from "../config";
import { Bundle, CreateBundleRequest, QuoteRequest } from "../types/bundle.types";


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
        const response = await Api.post("/bundle/preview", {
            selectedPackages: packages,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch quote.");
    }
};



export const createBundle = async (data: CreateBundleRequest) => {
    try {
        const response = await Api.post("/bundle", data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create bundle.");
    }
};


export const getPresetBundles = async (): Promise<Bundle[]> => {
    try {
        const response = await Api.get("/bundle/preset");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch bundles:", error);
        throw new Error("Failed to fetch bundles.");
    }
};

export const getBundleById = async (id: string): Promise<Bundle> => {
    try {
        const response = await Api.get(`/bundle/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch bundle:", error);
        throw new Error("Failed to fetch bundle.");
    }
};




export const subscribeBundle = async (id: string) => {
    try {
        const response = await Api.post(`/subscription`, { bundleId: id });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to subscribe bundle.");
    }
};

export const prepareSubscription = async (id: string, intervals: number) => {
    try {
        const response = await Api.post(`/subscription/prepare`, { numberOfIntervals: intervals, bundleId: id });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to prepare bundle.");
    }
};


export const paymentBundle = async (id: string) => {
    try {
        const response = await Api.post(`/payment/begin-subscription`, { subscriptionId: id });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to subscribe bundle.");
    }
}