"use client";
import AppLayout from "@/app/components/common/AppLayout";
import { Spinner } from "@/app/components/common/Spinner";
import { getUserActivity } from "@/app/services/auth.service";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

interface ActivityItem {
    bundle: {
        _id: string;
        name: string;
        description: string;
        color: string;
        selectedPackages: {
            service: {
                _id: string;
                name: string;
                logo: string;
                description: string;
            };
            package: {
                name: string;
                amount: number;
                frequency: string;
            };
        }[];
    };
    amount:number;
    date: string;
    text: string;
    status: string;
    statusThemeClass: string;
    type: string;
}

const statusColors: Record<string, string> = {
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
};

const ActivityPage = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const data = await getUserActivity();
                setActivities(data);
            } catch (err: unknown) {
                toast.error(
                    err instanceof Error
                        ? err.message || "Failed to fetch activity"
                        : "Failed to fetch activity"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }

    if (!activities.length) {
        return (
            <div className="w-full min-h-screen text-center py-8 text-gray-500">
                No activity available.
            </div>
        );
    }

    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen bg-gray-50 relative overflow-hidden px-4 pb-24">
                {/* Header */}
                <div className="flex items-center gap-4 py-5 sticky top-0 bg-gray-50 z-10">
                    <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className="text-xl font-semibold text-gray-900">
                        Activity
                    </h5>
                </div>

                {/* Activity List */}
                <section className="w-full mt-4">
                    <div className="flex flex-col gap-3 h-[700px] lg:h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
                        {activities.map((item, idx) => {
                            const bundle = item.bundle;
                            const firstPackage = bundle.selectedPackages[0];
                            const formattedDate = dayjs(item.date).format("DD MMM YYYY");
                            const formattedTime = dayjs(item.date).format("hh:mm A");

                            return (
                                <div
                                    key={idx}
                                    className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                                >
                                    {/* Top Section */}
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {bundle.name}
                                        </p>
                                        <span
                                            className={`inline-flex w-auto text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${statusColors[item.status] || "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <Image
                                                src={firstPackage.service.logo}
                                                alt={firstPackage.service.name}
                                                width={42}
                                                height={42}
                                                className="rounded-full border border-gray-300"
                                            />
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-medium text-gray-800">
                                                    {item.text}
                                                </h4>
                                                <span className="text-xs text-gray-600 px-2 py-0.5 border border-gray-300 rounded-full mt-1 w-fit">
                                                    {firstPackage.package.frequency === "monthly"
                                                        ? "Monthly Billing"
                                                        : "One-time"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end text-right">
                                            <div className="flex items-center gap-1 text-base text-gray-900 font-semibold">
                                                <Image
                                                    src="/assets/mock/usdc.png"
                                                    width={16}
                                                    height={16}
                                                    alt="usdc"
                                                />
                                                {item.amount}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                {formattedDate}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formattedTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </AppLayout>
    );
};

export default ActivityPage;
