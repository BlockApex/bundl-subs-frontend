"use client";
import BundleCard from "@/app/components/BundleCard";
import AppLayout from "@/app/components/common/AppLayout";
import Input from "@/app/components/common/Input";
import { categories } from "@/app/config";
import { ChevronLeft, ListFilter, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPresetBundles } from "@/app/services/bundle.service";
import { Spinner } from "@/app/components/common/Spinner";
import { Bundle, BundleItem } from "@/app/types/bundle.types";

const Discover = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                setLoading(true);
                const data = await getPresetBundles();
                setBundles(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message || "Failed to create bundle");
                } else {
                    console.error("Unknown error:", err);
                    toast.error("Bundle creation failed. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBundles();
    }, []);

    // ✅ Apply search + category filters
    const filteredBundles = bundles.filter((bundle) => {
        const matchesSearch =
            bundle.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category.label === "All" ||
            bundle.selectedPackages.some(
                (pkg: BundleItem) => pkg.service.category.toLowerCase() === category.label.toLowerCase()
            );

        return matchesSearch && matchesCategory;
    });

    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden pb-12">
                <section className="w-full bg-dark rounded-b-xl px-4">
                    <br />
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                // onClick={onClick}
                                className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition"
                            >
                                <ChevronLeft className="text-white" />
                            </button>
                            <h5 className="text-xl font-normal text-white">Discover</h5>
                        </div>
                        <Link href="/create" className="text-base text-primary">
                            Create Your Own
                        </Link>
                    </div>

                    <div className="w-full mt-6 pb-4">
                        <div className="relative flex items-center">
                            <Input
                                label=""
                                value={search}
                                onChange={setSearch}
                                placeholder="Search subscriptions..."
                                className="text-white"
                                icon={<Search className="text-white" />}
                            />
                            <button className="absolute right-2 w-10 h-10 flex items-center justify-center bg-white/30 rounded-lg">
                                <ListFilter size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setCategory(c)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all ${category.id === c.id
                                        ? "bg-primary/60 border-primary text-black"
                                        : "border-white text-white hover:bg-primary/20"
                                        }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results */}
                <div className="flex flex-col gap-8 mt-4 p-4 h-[600px] lg:h-[500px] overflow-y-scroll">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : filteredBundles.length > 0 ? (
                        filteredBundles.map((b, i) => (
                            <BundleCard bundle={b} key={i} />
                        ))
                    ) : (
                        <p className="text-center text-gray-400">No bundles found</p>
                    )}
                </div>
            </main>
        </AppLayout>
    );
};

export default Discover;
