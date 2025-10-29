"use client"
import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/common/AppLayout'
import { DollarSign, Sparkle, TrendingUp, Wallet2 } from 'lucide-react'
import { Spinner } from '@/app/components/common/Spinner'
import { getUserStats } from '@/app/services/auth.service'
import toast from 'react-hot-toast'
import UserBalance from '@/app/components/UserBalance'
import Link from 'next/link'


const WalletPage = () => {
    const [_loading, _setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                _setLoading(true);
                const data = await getUserStats();
                console.log(data);
                setStats(data);
            } catch (err: unknown) {
                toast.error(
                    err instanceof Error
                        ? err.message || "Failed to fetch stats"
                        : "Failed to fetch stats"
                );
            } finally {
                _setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (_loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="w-full min-h-screen text-center py-8 text-gray-500">
                No stats available.
            </div>
        );
    }
    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden p-4">
                <h5 className={`text-xl font-normal text-black`}>
                    Account Summary
                </h5>
                <br />
                <UserBalance lastData={stats?.lastPaymentDate} paymentsDueNext30Days={stats?.paymentsDueNext30Days} />
                <div className='w-full bg-dark rounded-xl p-4 my-4 relative flex items-center justify-between'>
                    <h6 className='text-lg text-white'>Referral Bonus +0</h6>
                    <p className='text-base text-foreground flex items-center gap-2'> <span className='w-4 h-4 bg-success/10 rounded-full flex items-center justify-center'><span className='w-2 h-2 bg-success rounded-full block'></span></span> (0 Active Referrals)</p>
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
                    <Link href='https://forms.gle/YRug8xQ4jK5mH1PL7' target='_blank'>
                        <span className='bg-primary-dark px-3 py-1 rounded-full text-white'>Join Waitlist</span>
                    </Link>
                </div>
                <div className="w-full flex items-stretch justify-between gap-4 mt-6">
                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <DollarSign className="text-danger" />
                        <p className="text-foreground font-normal text-base">Monthly Spend</p>
                        <p className="text-danger font-normal text-base">${stats?.totalMonthlySpending}</p>
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <Sparkle className="text-primary" />
                        <p className="text-foreground font-normal text-base">Total Savings</p>
                        <p className="text-primary font-normal text-base">${stats?.totalMonthlySavings}</p>
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-xl flex flex-col items-start gap-2 p-4">
                        <Wallet2 className="text-foreground" />
                        <p className="text-foreground font-normal text-base">Next Bill</p>
                        <p className="text-black font-normal text-base">${stats?.paymentsDueNext30Days}</p>
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
            </main>
        </AppLayout>
    )
}

export default WalletPage