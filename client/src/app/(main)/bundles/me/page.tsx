"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import AppLayout from '@/app/components/common/AppLayout'




const statuses = [
    {
        id: "all",
        label: "All"
    },
    {
        id: "active",
        label: "Active"
    },
    {
        id: "paused",
        label: "Paused"
    },
    {
        id: "grace",
        label: "In Grace Period"
    },
    {
        id: "canceled",
        label: "Canceled"
    },
]
const ActiveBundles = () => {
    const [status, setStatus] = useState(statuses[0]);
    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden p-4">
                <h5 className={`text-xl font-normal text-black`}>
                    My Bundles
                </h5>
                <div className="flex items-center justify-between">
                    <div></div>
                    <Link href="/discover" className="text-base text-primary">
                        + Add More
                    </Link>
                </div>
                <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
                    {statuses.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStatus(s)}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all ${s.id === status.id
                                ? "bg-primary/60 border-primary text-black"
                                : "border-black text-black hover:bg-primary/20"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className='flex flex-col gap-8 mt-4 p-2'>
                    {/* {data.map((b, i) => {
                        return (
                            <BundleCard bundle={b} key={i} />
                        )
                    })} */}
                </div>
            </main>
        </AppLayout>
    )
}

export default ActiveBundles