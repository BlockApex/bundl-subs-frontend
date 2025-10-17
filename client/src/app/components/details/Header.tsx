'use client'
import { ChevronLeft, Gift } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const BundleDetailHeader = () => {
    const router = useRouter()

    return (
        <div className='w-full bg-primary-dark rounded-b-xl px-4 py-6'>
            <div className='flex items-start gap-4'>
                <button
                    onClick={() => router.back()}
                    className='w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition'
                >
                    <ChevronLeft />
                </button>
                <div>
                    <h5 className='text-xl font-normal text-white'>
                        Developer Essentials
                    </h5>
                    <p className='text-base text-white mt-1'>
                        Everything you need for Web3 trading and analysis
                    </p>
                </div>
            </div>
            <div className='w-full flex items-start justify-between mt-4'>
                <div className='flex flex-col'>
                    <small className='text-white'>You Pay</small>
                    <div className='flex items-center gap-4 mt-1'>
                        <p className='text-white font-normal text-base line-through'>$57.32</p>
                        <p className='text-white font-semibold text-base'>$47.32</p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <small className='text-white'>You Save</small>
                    <div className='flex items-center gap-4 mt-1'>
                        <p className='text-white font-semibold text-base'>
                            $8.18
                            <small className='ms-1'>(16%)</small>
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full border border-gray-300 rounded-xl p-4 mt-6'>
                <p className='text-base text-white font-normal flex items-center gap-2'>
                    <Gift size={20} />
                    Extra Perks
                </p>
                <ul className='mt-2 text-sm text-white'>
                    <li>• Cumulative Free 60 Days Use Access</li>
                    <li>• Early access to new features</li>
                </ul>
            </div>
        </div>
    )
}

export default BundleDetailHeader
