"use client";
import { ChevronLeft, ChevronRight, MoveRight, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import Input from "../common/Input";
import Image from "next/image";
import { Button } from "../common/Button";

const categories = [
    { id: 1, label: "All" },
    { id: 2, label: "Featured" },
    { id: 3, label: "AI" },
    { id: 4, label: "Dev" },
    { id: 5, label: "Design" },
    { id: 6, label: "Productivity" },
];


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


interface MakeBundleProps {
    onClick: () => void
}


const MakeBundle: React.FC<MakeBundleProps> = ({ onClick }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(categories[0]);

    return (
        <div className="w-full h-auto relative">
            <section className="w-full bg-dark rounded-b-xl px-4">
                <br />
                <div className="flex items-center justify-start gap-2">
                    <button onClick={onClick} className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition">
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className="text-xl font-normal text-white">
                        Build your first Bundle
                    </h5>
                </div>

                <div className="w-full mt-6 pb-4">
                    <Input
                        label=""
                        value={search}
                        onChange={setSearch}
                        placeholder="Search subscriptions..."
                        className="text-white"
                        icon={<Search className="text-white" />}
                    />

                    {/* Category Buttons */}
                    <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setCategory(c)}
                                className={`
                  whitespace-nowrap px-4 py-2 rounded-xl border transition-all
                  ${category.id === c.id
                                        ? "bg-primary/60 border-primary text-black"
                                        : "border-white text-white hover:bg-primary/20"}
                `}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="w-full h-auto relative flex flex-col gap-3 p-4">
                {subscriptions.map((s, i) => {
                    return (
                        <div className="w-full relative border border-gray-300 px-3 py-4 rounded-xl" key={i}>
                            <div className="w-full h-full flex items-start justify-between gap-4">
                                <Image
                                    src={s.image}
                                    alt={s.name}
                                    width={50}
                                    height={50}
                                    className="rounded-lg"
                                />
                                <div className="w-full">
                                    <h6 className="text-md font-normal text-black">
                                        {s.name}
                                    </h6>
                                    <p className="text-sm text-foreground font-normal">
                                        Stream movies and TV shows
                                    </p>
                                    <div className="flex  items-center justify-start gap-2 my-2">
                                        <span className="px-3 py-1 text-foreground text-sm bg-gray-200 rounded-lg">
                                            Entertainment
                                        </span>
                                        <span className="px-3 py-1 text-primary text-xs bg-primary/20 rounded-lg">
                                            10% off
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start gap-2">
                                        <p className="text-sm text-foreground line-through">
                                            ${s.oldPrice.toFixed(2)}
                                        </p>
                                        <p className="text-base font-normal text-black">
                                            ${s.newPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="min-h-full">
                                    <button className="text-foreground absolute top-4 right-4">
                                        <ChevronRight size={20} />
                                    </button>
                                    <button className="p-1 bg-dark rounded-md absolute bottom-4 right-4">
                                        <Plus size={15} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>

            <section className='w-full z-50 lg:max-w-3xl mx-auto flex items-center justify-center fixed bottom-0 left-0 right-0 p-2'>
                <div className='w-full max-w-[100%] bg-dark p-2 rounded-xl flex items-center justify-between'>
                    <div className="flex items-center gap-2 p-4">
                        <div className="flex items-center">
                            <Image src='/assets/mock/detail/1.png' alt="Subscription" width={30} height={30} className="rounded-full" />
                            <Image src='/assets/mock/detail/2.png' alt="Subscription" width={30} height={30} className="rounded-full" />
                        </div>
                        <p className="text-sm lg:text-base text-white font-normal">2 services</p>
                    </div>
                    <div className="flex items-center gap-4 p-4">
                        <p className="text-white font-normal text-sm lg:text-base">
                            $19.98/mo
                        </p>
                        <Button variant="secondary" size="sm" className="flex items-center gap-2">
                            Checkout <MoveRight size={18} />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MakeBundle;
