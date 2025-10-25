"use client";
import { clusterApiUrl, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import React, { useState } from "react";
import clsx from "clsx";
import Switch from "../common/Switch";
import { Check, Sparkle, TrendingUp, Wallet2 } from "lucide-react";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { useParams } from 'next/navigation';
import PaymentSuccess from "./PaymentSuccess";
import { subscribeBundle } from "@/app/services/bundle.service";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";



type InstructionKey = {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
};



interface RpcError {
    message?: string;
    logs?: string[];
    code?: number;
    data?: unknown;
}


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
    const { id } = useParams<{ id: string }>()
    const { publicKey, sendTransaction } = useWallet();

    const [enabled, setEnabled] = useState(false);
    const [duration, setDuration] = useState(durations[1]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubscribe = async () => {
        console.log("🟢 Connected Wallet:", publicKey?.toBase58());
        if (!publicKey) throw new Error("Wallet not connected");

        try {
            setLoading(true);

            console.log("📡 Fetching transaction data from backend...");
            const response = await subscribeBundle(id);
            console.log("✅ Backend Response:", response);

            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

            for (const [i, txData] of response.transactions.entries()) {
                console.log(`🧩 Processing Transaction #${i + 1} | Type: ${txData.type}`);

                const tx = new Transaction();

                if (txData.type === "approval") {
                    const instr = txData.data.instruction;

                    const keys = instr.keys.map((k: InstructionKey) => ({
                        pubkey: new PublicKey(k.pubkey),
                        isSigner: k.isSigner,
                        isWritable: k.isWritable,
                    }));

                    const programId = new PublicKey(instr.programId);
                    const data = Buffer.from(instr.data);

                    tx.add(new TransactionInstruction({ keys, programId, data }));
                    console.log("   ↳ Approval instruction added");

                } else
                     if (txData.type === "bundle") {
                    const bundleTx = txData.data.transaction;

                    for (const instr of bundleTx.instructions) {
                        const keys = instr.keys.map((k: InstructionKey) => ({
                            pubkey: new PublicKey(k.pubkey),
                            isSigner: k.isSigner,
                            isWritable: k.isWritable,
                        }));

                        const programId = new PublicKey(instr.programId);
                        const data = Buffer.from(instr.data);

                        tx.add(new TransactionInstruction({ keys, programId, data }));
                    }
                    console.log(`   ↳ Bundle transaction added with ${bundleTx.instructions.length} instructions`);

                    // Optional: handle additional backend signers if you have their Keypairs
                    // if (bundleTx.signers?.length) {
                    //     tx.partialSign(...bundleTx.signersAsKeypairs);
                    // }
                }

                const latestBlockhash = await connection.getLatestBlockhash("confirmed");
                tx.recentBlockhash = latestBlockhash.blockhash;
                tx.feePayer = publicKey!;

                console.log("🚀 Sending transaction...");
                const signature = await sendTransaction(tx, connection, {
                    skipPreflight:true,
                    preflightCommitment: "confirmed",
                    maxRetries: 2,
                });

                console.log("✅ Transaction Sent! Signature:", signature);

                await connection.confirmTransaction(
                    {
                        signature,
                        blockhash: latestBlockhash.blockhash,
                        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                    },
                    "confirmed"
                );

                console.log("🎉 Transaction Confirmed!");
            }

            toast.success("Bundle subscribed successfully!");
        } catch (err: unknown) {
            console.error("❌ Transaction Error:", err);
            toast.error((err as Error)?.message || "Failed to subscribe bundle");
        } finally {
            setLoading(false);
            console.log("🧹 Transaction attempt finished");
        }
    };


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
                    const selected = !m.disabled;
                    const styles = selected ? 'border border-primary bg-primary/10' : 'border border-gray-200'
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
                <Button loading={loading} onClick={handleSubscribe} className="" variant="dark" size="full">
                    Subscribe
                </Button>
            </div>
            <PaymentSuccess open={success} setOpen={setSuccess} />
        </div>
    );
};

export default PaymentForm;
