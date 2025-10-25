"use client";
import AppLayout from "@/app/components/common/AppLayout";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const activities = [

    {
        id: 1,
        title: "Dev Monk Bundle",
        status: "Activated",
        description: "Billing paused. Seats at 5/5.",
        walletType: "Debit Wallet",
        amount: "29.00",
        date: "17 Sep 2023",
        time: "10:34 AM",
        icon: "/assets/mock/bundle/1.png",
    },
    {
        id: 2,
        title: "Project Manager Bundle",
        status: "Paused",
        description: "Billing paused. Seats at 5/5.",
        walletType: "Debit Wallet",
        amount: "6.40",
        date: "21 Oct 2025",
        time: "08:34 AM",
        icon: "/assets/mock/bundle/1.png",
    },
    {
        id: 3,
        title: "Trader Essentials",
        status: "Active",
        description: "Paymed Complete Next renewal on Nov 22, 2025.",
        walletType: "Smart Balance",
        amount: "14.95",
        date: "22 Oct 2025",
        time: "04:20 PM",
        icon: "/assets/mock/bundle/1.png",
    },
    {
        id: 4,
        title: "Biz Ops Bundle",
        status: "Renewal Due",
        description: "Invoice RF-1289 due Oct 28, 2025. Auto-pay scheduled",
        walletType: "Debit Wallet",
        amount: "49.00",
        date: "20 Oct 2025",
        time: "10:34 AM",
        icon: "/assets/mock/bundle/1.png",
    },
    {
        id: 5,
        title: "Biz Ops Bundle",
        status: "Renewal Due",
        description: "Invoice RF-1289 due Oct 28, 2025. Auto-pay scheduled",
        walletType: "Debit Wallet",
        amount: "49.00",
        date: "20 Oct 2025",
        time: "10:34 AM",
        icon: "/assets/mock/bundle/1.png",
    },
]
const statusColors: Record<string, string> = {
    Activated: "bg-green-100 text-green-700",
    Active: "bg-green-100 text-green-700",
    Paused: "bg-teal-100 text-teal-700",
    "Renewal Due": "bg-yellow-100 text-yellow-700",
};

const ActivityPage = () => {
    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen bg-white relative overflow-hidden px-4 pb-24">
                {/* Header */}
                <div className="flex items-center gap-4 py-4">
                    <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className="text-xl font-semibold text-gray-900">Activity</h5>
                </div>

                <section className="w-full">
                    <div className="flex flex-col gap-3">
                        {activities.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-100 rounded-lg px-4 py-2">
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-foreground text-sm">{item.title}</p>
                                    <span className={`text-sm px-4 py-1 rounded-full font-medium ${statusColors[item.status]}`}>{item.status}</span>
                                </div>
                                <div className="w-full flex items-center justify-between mt-2">
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm font-medium text-foreground">
                                                {item.description.slice(0,20)}
                                            </h4>
                                            <span className="text-xs text-black px-2 py-1 border border-foreground rounded-full text-center">Debit Wallet</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <h6 className="flex items-center gap-1 text-base text-black">
                                            <Image
                                                src='/assets/mock/usdc.png'
                                                width={15}
                                                height={15}
                                                alt="usdc"
                                            />
                                            29.00
                                        </h6>
                                        <small className="text-xs text-foreground mt-2">17 Sep 2023</small>
                                        <small className="text-xs text-foreground">10:34 AM</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </AppLayout>
    );
};

export default ActivityPage;
