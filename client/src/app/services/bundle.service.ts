import { Api } from "../config";
import { Bundle, ClaimPackagePayload, CreateBundleRequest, MyBundle, QuoteRequest, Subscription } from "../types/bundle.types";


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


export const getSubscriptionById = async (id: string): Promise<Subscription> => {
    try {
        const response = await Api.get(`/subscription/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch subscription:", error);
        throw new Error("Failed to fetch subscription.");
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
        throw error;
    }
};


export const paymentBundle = async (id: string) => {
    try {
        const response = await Api.post(`/payment/begin-subscription`, { subscriptionId: id });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getMyBundles = async () => {
    try {
        // Fetch bundles and subscriptions concurrently
        const [bundlesRes, subsRes] = await Promise.allSettled([
            Api.get('/bundle'),
            Api.get('/subscription'),
        ]);

        // Extract data safely
        const bundles =
            bundlesRes.status === 'fulfilled' && Array.isArray(bundlesRes.value.data)
                ? bundlesRes.value.data
                : [];

        const subscriptions =
            subsRes.status === 'fulfilled' && Array.isArray(subsRes.value.data)
                ? subsRes.value.data.map((s: Subscription) => ({
                    ...s,
                    isSubscription: true,
                }))
                : [];

        // Merge and remove duplicates by `_id`
        const allBundlesMap = new Map<string, MyBundle>();
        [...bundles, ...subscriptions].forEach((item) => {
            if (item && item._id) {
                allBundlesMap.set(item._id, item);
            }
        });

        const allBundles = Array.from(allBundlesMap.values());

        // If nothing found
        if (allBundles.length === 0) {
            console.warn('No bundles or subscriptions found.');
            return [];
        }

        return allBundles;
    } catch (error) {
        console.error('❌ Failed to fetch bundles:', error);
        return []; // Return empty array to avoid breaking UI
    }
};

export const recentActiveBundles = async () => {
    try {
        const response = await Api.get("/subscription");

        // ✅ Ensure response.data is an array
        const data = Array.isArray(response.data) ? response.data : [];

        // ✅ Return only up to 3 items
        const recentBundles = data.length > 3 ? data.slice(0, 3) : data;

        return recentBundles;
    } catch (error) {
        console.error("❌ Failed to fetch bundles:", error);
        throw new Error("Failed to fetch bundles.");
    }
};






export const claimSubscription = async (id: string, data: ClaimPackagePayload) => {
    try {
        const response = await Api.post(`/subscription/${id}/claim`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}