"use client";
import BundleCard from "@/app/components/BundleCard";
import AppLayout from "@/app/components/common/AppLayout";
import Input from "@/app/components/common/Input";
import { ListFilter, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPresetBundles } from "@/app/services/bundle.service";
import { Spinner } from "@/app/components/common/Spinner";
import { Bundle, BundleItem, DiscoverFilterType } from "@/app/types/bundle.types";
import DiscoverFilter from "@/app/components/DiscoverFilter";

const Discover = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<{ id: number, label: string }[]>([])
    // const [category, setCategory] = useState<{ id: number, label: string }>({ id: 1, label: "All" });
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<DiscoverFilterType>({
        category: { id: 1, label: 'All' },
        perk: null,
        discount: 0,
        min: '',
        max: ''
    })

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                setLoading(true);
                const data = await getPresetBundles();
                const categoriesArr = Array.from(
                    new Set(
                        data
                            .flatMap((bundle) =>
                                bundle.selectedPackages.map(
                                    (pkg) =>
                                        pkg.service.category &&
                                        pkg.service.category.charAt(0).toUpperCase() +
                                        pkg.service.category.slice(1).toLowerCase()
                                )
                            )
                            .filter((cat): cat is string => Boolean(cat)) // ✅ removes null/undefined safely
                    )
                );
                const categories = [
                    { id: 1, label: "All" },
                    ...categoriesArr.map((cat, index) => ({
                        id: index + 2,
                        label: cat,
                    })),
                ];
                setCategories(categories)
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
        const searchLower = search.toLowerCase();

        // Match bundle name, service name, or package name
        const matchesSearch =
            bundle.name.toLowerCase().includes(searchLower) ||
            bundle.selectedPackages.some(
                (pkg: BundleItem) =>
                    pkg.service.name.toLowerCase().includes(searchLower) ||
                    pkg.package.name.toLowerCase().includes(searchLower)
            );

        // Match category filter
        const matchesCategory =
            filter?.category.label === "All" ||
            bundle.selectedPackages.some(
                (pkg: BundleItem) =>
                    pkg.service.category?.toLowerCase() ===
                    filter.category.label.toLowerCase()
            );

  // 3️⃣ Match price range filter (fixed)
  const total = Number(bundle.totalFirstDiscountedPrice) || 0;
  const min = Number(filter.min);
  const max = Number(filter.max);

  // ✅ Only filter if min or max are not both zero or empty
  const shouldApplyPriceFilter =
    (!!filter.min && filter.min !== "0") || (!!filter.max && filter.max !== "0");

  const matchesPrice = shouldApplyPriceFilter
    ? total >= (isNaN(min) ? 0 : min) && total <= (isNaN(max) ? Infinity : max || Infinity)
    : true;

        return matchesSearch && matchesCategory && matchesPrice;
    });


    const applyFilter = (filter: DiscoverFilterType) => {
        console.log(JSON.stringify(filter))
        setFilter(filter);
    }


    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden pb-12">
                <section className="w-full bg-dark rounded-b-xl px-4">
                    <br />
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            {/* <button
                                // onClick={onClick}
                                className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition"
                            >
                                <ChevronLeft className="text-white" />
                            </button> */}
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
                            <button onClick={() => setFilterOpen(true)} className="absolute right-2 w-10 h-10 flex items-center justify-center bg-white/30 rounded-lg">
                                <ListFilter size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setFilter({ ...filter, category: c })}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all ${filter.category.id === c.id
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
                <DiscoverFilter
                    categories={categories}
                    applyFilter={applyFilter} open={filterOpen} setOpen={setFilterOpen} />
            </main>
        </AppLayout>
    );
};

export default Discover;
