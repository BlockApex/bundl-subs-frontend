"use client";
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/common/Button";

const subscriptions = [
    {
        id: 1,
        name: "ChatGPT Plus",
        description: "Advanced AI assistant",
        price: "$18.00/mo",
        status: "claimed",
        actionText: "Access Granted !",
        icon: '/assets/mock/bundle/1.png'
    },
    {
        id: 2,
        name: "GitHub Copilot",
        description: "Professional",
        price: "$12.00",
        status: "unclaimed",
        actionText: "Click Activate to receive access ",
        icon: '/assets/mock/bundle/2.png'
    },
    {
        id: 3,
        name: "Vercel",
        description: "Standard",
        price: "$25.50",
        status: "unclaimed",
        actionText: "Click Activate to receive access ",
        icon: '/assets/mock/bundle/3.png'
    },
    {
        id: 4,
        name: "Cursor",
        description: "Business",
        price: "$10.80",
        status: "unclaimed",
        actionText: "Click Activate to receive access ",
        icon: '/assets/mock/bundle/4.png'
    },
];


const renderStatus = (s: string) => {
    if (s === 'claimed') {
        return (
            <span className="px-4 py-1 bg-success/30 rounded-xl text-success" >{s}</span>
        )
    } else {
        return (
            <span className="px-4 py-1 bg-warning/20 rounded-xl text-warning" >{s}</span>
        )
    }
}

const ClaimSubscriptions = () => {
    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            {/* Header */}
            <div className='w-full bg-primary-dark rounded-b-xl px-4 py-6'>
                <div className='flex items-center gap-4'>
                    <button
                        // onClick={() => router.back()}
                        className='w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center'>
                        <ChevronLeft className='text-black' />
                    </button>
                    <div>
                        <h5 className={`text-xl font-normal text-white`}>
                            Claim Subscriptions
                        </h5>
                    </div>
                </div>
            </div>
            <div className="w-full px-2 lg:px-6 py-4" >
                {/* Subtext */}
                <p className="text-base text-black text-center">
                    You’ll receive instructions or direct access once claimed.
                </p>
                <div className="w-full h-[650px] lg:h-[550px] overflow-y-scroll p-4 flex flex-col gap-4">
                    {subscriptions.map((s, i) => {
                        return (
                            <div className="w-full rounded-xl bg-success/40 p-2" key={i}>
                                <div className="w-full rounded-xl bg-white p-3 lg:p-4">
                                    {renderStatus(s.status)}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-start gap-2">
                                            <Image alt="icon" src={s.icon} width={50} height={50} className="rounded-xl" />
                                            <div>
                                                <h6 className="text-base text-black">{s.name}</h6>
                                                <p className="text-sm text-foreground">{s.description}</p>
                                            </div>
                                        </div>
                                        <h6 className="text-lg text-black">{s?.price}</h6>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between px-2 py-4">
                                    <p className="text-sm text-black">{s.actionText}</p>
                                    <Button variant="dark" size="sm">
                                        Activate <ChevronRight size={17} />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="p-4 ">
                    <Button variant="dark" size="full" className="mt-4">
                        Finish & Go to Dashboard <ChevronRight />
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default ClaimSubscriptions;
