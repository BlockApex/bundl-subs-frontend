"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Sparkle } from "lucide-react";

export const subscriptions = [
    {
        id: 1,
        name: "ChatGPT Plus",
        plan: "Advanced AI assistant",
        features: ["GPT-4 access", "Priority response", "Advanced features"],
        oldPrice: 20.0,
        newPrice: 18.0,
        discountPercent: 10,
        badge: "Plus",
        image: "/assets/mock/detail/1.png",
        trial: null,
    },
    {
        id: 2,
        name: "Figma",
        plan: "Professional",
        features: ["GPT-4 access", "Priority response", "Advanced features"],
        oldPrice: 15.0,
        newPrice: 12.0,
        discountPercent: 20,
        badge: null,
        trial: "1 Month Free Trial",
        image: "/assets/mock/detail/2.png",
    },
    {
        id: 3,
        name: "Midjourney",
        plan: "Standard",
        features: ["GPT-4 access", "Priority response", "Advanced features"],
        oldPrice: 30.0,
        newPrice: 25.5,
        discountPercent: 15,
        badge: null,
        trial: null,
        image: "/assets/mock/detail/3.png",
    },
    {
        id: 4,
        name: "Loom",
        plan: "Business",
        features: ["GPT-4 access", "Priority response", "Advanced features"],
        oldPrice: 12.0,
        newPrice: 10.8,
        discountPercent: 10,
        badge: null,
        trial: null,
        image: "/assets/mock/detail/4.png",
    },
    {
        id: 5,
        name: "Netflix",
        plan: "Premium",
        features: ["GPT-4 access", "Priority response", "Advanced features"],
        oldPrice: 19.99,
        newPrice: 17.99,
        discountPercent: 10,
        badge: null,
        trial: "1 Month Free Trial",
        image: "/assets/mock/detail/5.png",
    },
];

const BundleServices = () => {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="w-full h-auto relative p-4">
            <div className='flex items-center justify-between my-4'>
                <p className='text-base text-foreground font-normal '>Included Services</p>
            </div>
            <div className="w-full flex flex-col gap-4">
                {subscriptions.map((sub) => {
                    const isExpanded = expandedId === sub.id;
                    return (
                        <div
                            key={sub.id}
                            className={`bg-white relative rounded-xl border border-gray-300 transition-all duration-300 `}
                        >
                            {sub.trial && (
                                <div className="absolute -top-2 right-0 bg-[#F8D69F] text-[#5B3B00] text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-xl shadow-sm z-0">
                                    {sub.trial}
                                </div>
                            )}
                            {/* Header */}
                            <div
                                className="z-50 flex justify-between items-center p-4 cursor-pointer select-none"
                                onClick={() => toggleExpand(sub.id)}>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={sub.image}
                                        alt={sub.name}
                                        width={40}
                                        height={40}
                                        className="rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-lg font-normal text-black">
                                            {sub.name}
                                        </h3>
                                        <p className="text-base text-foreground">{sub.plan}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-foreground line-through">
                                        ${sub.oldPrice.toFixed(2)}
                                    </p>
                                    <p className="text-base font-normal text-black">
                                        ${sub.newPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Expandable content with animation */}
                            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                <div className="px-6 pb-4">
                                    {sub.features && (
                                        <ul className="list-disc list-inside text-base text-foreground space-y-1">
                                            {sub.features.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="flex items-center justify-end">
                                        <p className='text-base text-primary flex items-center gap-2'> <Sparkle size={20} /> 10% OFF  </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BundleServices;
