"use client"
import React from 'react'
import AppLayout from '../../components/common/AppLayout'
import { DollarSign, Sparkle, TrendingUp, Wallet2 } from 'lucide-react'
// import { getProfile } from '../../services/auth.service'
import Image from 'next/image'


const WalletPage = () => {

    // const getProfileData = async () => {
    //     const response = await getProfile();
    //     console.log(response)
    // }
    // useEffect(() => {
    //     getProfileData();
    // }, [])

    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden p-4">
                <h5 className={`text-xl font-normal text-black`}>
                    Account Summary
                </h5>
                <br />
                <div className='w-full bg-dark rounded-xl p-4 mt-2 relative'>
                    <div className='w-full flex items-center justify-between gap-4 mb-4'>
                        <p className='text-base text-foreground font-normal'>Total Balance</p>
                    </div>
                    <h3 className='text-xl lg:text-2xl font-normal text-white mt-4'>$6500.00</h3>
                    <p className='text-sm lg:text-base text-foreground mt-4'>Wallet: <span className='text-white ms-2'>$6500.00</span></p>
                    <Image src='/assets/mock/depth-chart.svg' className='absolute top-5 right-5' alt='chart' width={150} height={200} />
                </div>
                <div className='w-full bg-dark rounded-xl p-4 my-4 relative flex items-center justify-between'>
                    <h6 className='text-lg text-white'>Referral Bonus +$25</h6>
                    <p className='text-base text-foreground flex items-center gap-2'> <span className='w-4 h-4 bg-success/10 rounded-full flex items-center justify-center'><span className='w-2 h-2 bg-success rounded-full block'></span></span> (2 Active Referrals)</p>
                </div>
                <div className='w-full bg-primary/20 rounded-lg p-4 mt-4  '>
                    <div className='w-full flex items-center justify-between gap-4 mb-4'>
                        <p className='text-base text-black font-normal flex items-center gap-4'> <TrendingUp className='text-primary' size={18} /> Smart Balance</p>
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
                <div className='my-2 flex flex-col items-end'>
                    <div className='w-full bg-[#FFDEA8] rounded-xl p-2'>
                        <p className='text-[#663A28] text-sm'>
                            Important: Yields are estimates, not guaranteed. Actual returns may vary based on market conditions. Monitor your coverage ratio regularly.
                        </p>
                    </div>
                    <span className='bg-primary-dark px-3 py-1 rounded-full text-white'>Join Waitlist</span>
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
                <div className='my-4 p-1'>
                    <h3 className='text-lg lg:text-xl text-black'>
                        Monitor your deposits, yield, and subscriptions
                    </h3>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div className="border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                            <DollarSign className="text-success self-end" />
                            <p className="text-foreground font-normal text-base">Total Balance</p>
                            <h6 className='text-black text-xl font-medium'>$00.00</h6>
                            <small className='text-sm text-success flex items-center gap-2'><TrendingUp size={12} /> +5.00%</small>
                        </div>
                        <div className="border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                            <TrendingUp className="text-[#C27AFF] self-end" />
                            <p className="text-foreground font-normal text-base">Yields Earned</p>
                            <h6 className='text-black text-xl font-medium'>$----</h6>
                            <small className='text-sm text-foreground flex items-center gap-2'>All time</small>
                        </div>
                    </div>
                </div>


                <div className='my-4 p-1 flex items-center justify-center'>
                    <Image src='/assets/mock/chart.png' alt='Chart' width={500} height={500}/>
                </div>

            </main>
        </AppLayout>
    )
}

export default WalletPage