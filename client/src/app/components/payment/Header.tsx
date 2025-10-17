'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaymentHeader = () => {
    const router = useRouter()

    return (
        <div className='w-full bg-dark rounded-b-xl px-4 py-6'>
            <div className='flex items-center gap-4'>
                <button
                    onClick={() => router.back()}
                    className='w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center'>
                    <ChevronLeft className='text-white' />
                </button>
                <div>
                    <h5 className={`text-xl font-normal text-white`}>
                        Payment & Funding
                    </h5>
                </div>
            </div>
            <div className='bg-dark-50/50 w-full lg:max-w-lg  mx-auto border border-gray-400 rounded-xl p-4 mt-6'>
                <div className='flex items-center justify-between'>
                    <p className='text-white text-base font-normal' >Monthly Charge</p>
                    <h6 className='text-xl text-white font-semibold'>USDC 66.29</h6>
                </div>
                <small className='text-sm text-white block mt-4'>Next billing: Nov 14, 2025</small>
            </div>
        </div>
    )
}

export default PaymentHeader