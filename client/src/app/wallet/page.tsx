import React from 'react'
import AppLayout from '../components/common/AppLayout'
import { DollarSign, Sparkle, TrendingUp, Wallet2 } from 'lucide-react'



const ActiveBundles = () => {
    return (
        <AppLayout>
            <main className="w-full min-h-screen relative overflow-hidden p-4">
                <div className='w-full bg-dark rounded-lg p-4 mt-2 '>
                    <div className='w-full flex items-center justify-between gap-4 mb-4'>
                        <p className='text-base text-white font-normal'>Total Balance</p>
                        <button className='text-base text-primary font-normal'>Add Funds</button>
                    </div>
                    <h3 className='text-lg font-normal text-white mt-4'>$650.00</h3>
                    <div className='flex items-center gap-4 mt-2'>
                        <div className='flex items-center gap-1'>
                            <p className='text-foreground text-base font-normal'>Wallet:</p>
                            <p className='text-foreground text-base font-normal'>$150.00</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-foreground text-base font-normal'>Smart:</p>
                            <p className='text-primary text-base font-normal'>$500.00</p>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-primary/20 rounded-lg p-4 mt-4  '>
                    <div className='w-full flex items-center justify-between gap-4 mb-4'>
                        <p className='text-base text-black font-normal flex items-center gap-4'> <TrendingUp className='text-primary' size={18} /> Balance</p>
                        <button className='text-base text-primary font-normal'>Manage</button>
                    </div>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <div className='flex flex-col'>
                            <p className='text-foreground text-base font-normal'>Balance</p>
                            <h6 className='text-lg font-normal text-dark'>$500.00</h6>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-foreground text-base font-normal'>APY</p>
                            <h6 className='text-lg font-normal text-primary'>~6.0%</h6>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-foreground text-base font-normal'>Est. Monthly</p>
                            <h6 className='text-lg font-normal text-primary'>$2.50</h6>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-stretch justify-between gap-4 mt-6">
                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <DollarSign className="text-danger" />
                        <p className="text-foreground font-normal text-base">Monthly Spend</p>
                        <p className="text-danger font-normal text-base">$47.32</p>
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <Sparkle className="text-primary" />
                        <p className="text-foreground font-normal text-base">Total Savings</p>
                        <p className="text-primary font-normal text-base">$8.18</p>
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <Wallet2 className="text-foreground" />
                        <p className="text-foreground font-normal text-base">Next Bill</p>
                        <p className="text-black font-normal text-base">$47.32</p>
                    </div>
                </div>

            </main>
        </AppLayout>
    )
}

export default ActiveBundles