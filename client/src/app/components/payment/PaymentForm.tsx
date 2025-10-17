"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Switch from "../common/Switch";
import Input from "../common/Input";
import { Button } from "../common/Button";
import { ChevronRight } from "lucide-react";
import PaymentSuccess from "./PaymentSuccess";

const durations = [
    { key: 3, label: "03 Months" },
    { key: 6, label: "06 Months" },
    { key: 12, label: "12 Months" },
];

const PaymentForm = () => {
    const [enabled, setEnabled] = useState(false);
    const [duration, setDuration] = useState(durations[1]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success , setSuccess] = useState(false);

    return (
        <div className="w-full h-auto relative p-4">
            <div className="w-full bg-gray-100 rounded-lg p-4">
                {/* Auto Renew Section */}
                <div className="flex items-start justify-between">
                    <h6 className="text-base lg:text-lg font-normal text-black mb-0 flex items-center gap-2">
                        Auto Renew Subscriptions
                    </h6>
                    <Switch checked={enabled} onChange={setEnabled} />
                </div>

                {/* Duration Selection */}
                <p className="text-base text-foreground font-normal my-4">
                    Select Duration
                </p>

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
            </div>
            <div className="w-full mt-4">
                <h6 className="text-base lg:text-lg font-normal text-black mb-0 flex items-center gap-2">
                    Contact Information
                </h6>
                <p className="text-base text-foreground font-normal">
                    Provide your email to receive subscription receipts and updates.
                </p>
                <br />
                <div className="flex flex-col gap-4">
                    <Input
                        label=""
                        value={name}
                        onChange={(e) => setName(e)}
                        placeholder="Name"
                    />
                    <Input
                        label=""
                        value={email}
                        onChange={(e) => setEmail(e)}
                        placeholder="Email"
                    />
                    <Button onClick={()=>setSuccess(true)} variant='dark' size='full' className='flex items-center gap-2' >
                        Confirm & Subscribe  <ChevronRight size={18} />
                    </Button>
                </div>
            </div>
            <PaymentSuccess open={success} setOpen={setSuccess} />
        </div>
    );
};

export default PaymentForm;
