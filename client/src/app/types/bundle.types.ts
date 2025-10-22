// types/service.ts
export interface Offer {
    type: string; // "%discount" | "free"
    amount: number;
    period: string;
    termsAndConditions: string;
}

export interface Package {
    _id: string;
    name: string;
    description: string;
    amount: number;
    frequency: string;
    offers: Offer[];
    isActive: boolean;
}

export interface Service {
    _id: string;
    name: string;
    logo: string;
    description: string;
    category: string;
    packages: Package[];
    isActive: boolean;
}


export interface QuoteRequest {
    selectedPackages: {
        serviceId: string;
        packageId: string;
    }[];
}

export interface QuoteResponse {
    totalPrice: number;
    totalDiscount: number;
    bundleItems: {
        serviceId: string;
        packageId: string;
        price: number;
        discount: number;
    }[];
}