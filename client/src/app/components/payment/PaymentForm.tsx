"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Switch from "../common/Switch";
import { Check, Sparkle, TrendingUp, Wallet2 } from "lucide-react";
import { Select } from "../common/Select";
import { Button } from "../common/Button";


const durations = [
    { key: 3, label: "03 Months" },
    { key: 6, label: "06 Months" },
    { key: 12, label: "12 Months" },
];


const currencies = [
    { _id: "sol", title: "Solana" },
    { _id: "usdc", title: "USDC" },
];

const methods = [
    {
        title: 'Smart Balance',
        text: 'Apply yield then debit wallet instantly',
        icon: <TrendingUp />,
        disabled: true
    },
    {
        title: 'Debit Wallet',
        text: 'Instantly charge from wallet balance',
        icon: <Wallet2 />,
        disabled: false
    },
    {
        title: 'Yield Only',
        text: 'Charge only from yield pause if insufficient ',
        icon: <Sparkle />,
        disabled: true
    },
]

const PaymentForm = () => {
    const [enabled, setEnabled] = useState(false);
    const [duration, setDuration] = useState(durations[1]);

    return (
        <div className="w-full h-auto relative p-4">
            {/* AUTO RENEW */}
            <div className="w-full bg-gray-100 rounded-lg p-4">
                {/* Auto Renew Section */}
                <div className="flex items-start justify-between">
                    <h6 className="text-base lg:text-lg font-normal text-black mb-0 flex items-center gap-2">
                        Auto Renew Subscriptions
                    </h6>
                    <Switch checked={enabled} onChange={setEnabled} />
                </div>
                {!enabled ? (
                    <p className="text-base text-foreground font-normal my-4">
                        This bundle is active for the next 30 days .
                    </p>
                ) : (
                    <p className="text-base text-foreground font-normal my-4">
                        Select Duration
                    </p>
                )}
                {enabled ? (
                    <div className="w-full flex items-center justify-between gap-6">
                        {durations.map((d) => {
                            const active = d.key === duration.key;

                            return (
                                <div
                                    key={d.key}
                                    onClick={() => setDuration(d)}
                                    className={clsx(
                                        "border border-primary p-4 rounded-xl cursor-pointer w-full text-center transition-all duration-300 transform",
                                        active
                                            ? "bg-primary text-white scale-105"
                                            : "bg-transparent text-black"
                                    )}
                                >
                                    <p className="text-base font-medium">{d.label}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : ''}

                <div className="mt-6">
                    <p className="text-base text-black mb-2">
                        Billing Cycle
                    </p>
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-foreground">
                            Start Date
                        </p>
                        <p className="text-sm text-black">
                            October 1, 2025
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-foreground">
                            Renew Date
                        </p>
                        <p className="text-sm text-black">
                            March 30, 2025
                        </p>
                    </div>
                </div>
            </div>
            <br />
            {/* PAYMENT METHOD */}
            <h6 className="text-base lg:text-lg font-normal text-black mb-0 flex items-center gap-2">
                Select Payment Method
            </h6>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {methods.map((m, i) => {
                    let selected = !m.disabled;
                    let styles = selected ? 'border border-primary bg-primary/10' : 'border border-gray-200'
                    return (
                        <div key={i} className={`relative w-full  p-4 rounded-xl ${styles}`}>
                            <span className="mb-2 block">
                                {m.icon}
                            </span>
                            <span className={`absolute top-4 right-4 w-5 h-5 border border-black rounded-full  flex items-center justify-center ${selected ? 'bg-black' : ''}`}>
                                {selected ? <Check size={15} className="text-white" /> : ''}
                            </span>
                            <h6 className="text-sm lg:text-lg text-black">{m.title}</h6>
                            <p className="text-foreground text-xs lg:text-sm mt-6">{m.text}</p>
                        </div>
                    )
                })}
            </div>
            <br />
            {/* PAYMENT CURRENCY */}
            <h6 className="text-base lg:text-lg font-normal text-black mb-0 flex items-center gap-2">
                Select Payment Currency
            </h6>
            <Select
                label=""
                options={currencies}
                value={''}
                onChange={(value) => null}
                placeholder="Select a Currency"
                error={''}
            />
            <br />
            <div className="w-full flex items-center justify-between border border-gray-300 p-4 rounded-xl">
                <p className="text-base text-forefround">
                    You Pay
                </p>
                <h6 className="text-lg text-black">$66.30</h6>
            </div>
            <div className="mt-6 pb-10">
                <Button className="" variant="dark" size="full">
                    Subscribe
                </Button>
            </div>
        </div>
    );
};

export default PaymentForm;
