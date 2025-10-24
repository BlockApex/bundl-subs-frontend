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
        service: string;
        package: string;
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


export interface SelectedPackage {
    service: string;
    package: string;
}




export interface CreateBundleRequest {
    name: string;
    description: string;
    color: string;
    selectedPackages: SelectedPackage[];
}



export interface BundleService {
    _id: string;
    name: string;
    logo: string;
}

export interface BundleItem {
    service: {
        _id: string;
        name: string;
        logo: string;
        category:string;
    };
}

export interface Bundle {
    _id: string;
    name: string;
    color: string;
    totalFirstDiscountedPrice: number;
    totalOriginalPrice: number;
    selectedPackages: BundleItem[];
    frequency:string;
}