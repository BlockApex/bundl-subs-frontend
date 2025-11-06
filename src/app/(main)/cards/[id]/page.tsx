"use client"
import Card from '@/app/components/Card'
import Switch from '@/app/components/common/Switch'
import { CheckCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const CardDetails = () => {
    const [enabled, setEnabled] = useState(false);
    return (
        <main className="w-full min-h-screen relative overflow-hidden pb-12">
            <section className='w-full px-4'>
                <br />
                <div className='flex items-center justify-start gap-3'>
                    <button
                        // onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition"
                    >
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className={`text-xl font-normal text-black`}>
                        Twitter (X) Card
                    </h5>
                </div>
            </section>
            <section className='w-full h-auto relative flex items-center justify-center my-6 card-dots'>
                <Card showOptions={true} />
            </section>
            <section className='w-full h-auto p-4 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <p className='text-base text-foreground'>Temporary Block</p>
                    <Switch checked={enabled} onChange={setEnabled} />
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-base text-foreground'>Rewards</p>
                    <ChevronRight className='text-foreground' />
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-base text-foreground'>Help</p>
                    <ChevronRight className='text-foreground' />
                </div>
            </section>
            <section className='w-full h-auto p-4 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <p className='text-base text-black flex items-center gap-2'>
                        <Clock size={17} />
                        Billing History</p>
                    <Link href="/" className="text-base text-primary">
                        View More
                    </Link>
                </div>
                {Array(10).fill(0).map((h, i) => {
                    return (
                        <div key={i} className='w-full border border-gray-100 p-4 rounded-xl shadow'>
                            <div className='flex items-center justify-between mb-2'>
                                <p className='text-base text-black flex items-center gap-2'>
                                    <CheckCircle className='text-primary' size={15} />
                                    $17.99
                                </p>
                                <p className='text-base text-success'>
                                    Paid
                                </p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-base text-foreground '>
                                    Oct 15, 2025
                                </p>
                                <p className='text-base text-foreground '>
                                    Debit Wallet
                                </p>
                            </div>
                        </div>
                    )
                })}
            </section>
        </main>
    )
}

export default CardDetails