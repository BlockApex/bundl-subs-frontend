"use client"
import { Sparkle } from 'lucide-react'
import React from 'react'
import { useUsdcBalance } from '../hooks/useUsdcBalance';
import { Spinner } from './common/Spinner';

const UserBalance = () => {
    const { balance, loading } = useUsdcBalance();
    return (
        <div className='w-full bg-dark rounded-xl p-4 mt-2 '>
            <div className='w-full flex items-center justify-between gap-4 mb-4'>
                <p className='text-base text-foreground font-normal'>Total Balance</p>
            </div>
            <h3 className='text-xl lg:text-2xl font-normal text-white mt-4'>
                {loading ? <Spinner size='sm' /> : ''}
                {balance ? `${balance} USDC` : '0 USDC'}
            </h3>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-4 mt-2'>
                <p className='text-primary text-sm lg:text-base flex items-center gap-2'>
                    <Sparkle size={16} />
                    Monthly Yield 250$
                </p>
                <div>
                    <p className='text-sm lg:text-base text-foreground '>Last Charged Date <span className='text-white ms-2'>19 Sep 2025</span></p>
                    <p className='text-sm lg:text-base text-foreground '>Upcoming Charges <span className='text-white ms-2'>70$</span></p>
                </div>
            </div>
        </div>
    )
}

export default UserBalance