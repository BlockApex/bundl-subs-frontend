'use client'
import { useParams } from 'next/navigation'

import { Button } from '@/app/components/common/Button'
import BundleDetailHeader from '@/app/components/details/Header'
import {  CirclePause, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {  Subscription } from '@/app/types/bundle.types'
import {  getSubscriptionById } from '@/app/services/bundle.service'
import toast from 'react-hot-toast'
import { Spinner } from '@/app/components/common/Spinner'
import SubscriptionCard from '@/app/components/SubscriptionCard'


const SubscriptionDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [flag , setFlag] = useState(false);

    useEffect(() => {
        const fettchSubscription = async () => {
            try {
                setLoading(true);
                const data = await getSubscriptionById(id);
                console.log(data)
                setSubscription(data)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message || 'Failed to fetch subscription');
                } else {
                    toast.error('Failed to fetch subscription');
                }
            } finally {
                setLoading(false);
            }
        };
        fettchSubscription();
    }, [id, flag]);


    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="w-full min-h-screen text-center py-8 text-gray-500">
                No Subscription available.
            </div>
        );
    }



    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            <BundleDetailHeader bundle={subscription.bundle} subscription={true} />
            <div className='w-full h-[600px] lg:h-[550px] overflow-y-scroll flex flex-col gap-4 p-4 mt-2'>
                {subscription && subscription.bundle.selectedPackages.map((s, i) => {
                    return (
                        <SubscriptionCard refetch={()=>setFlag(!flag)} subscription={s} key={i} claimedPackages={subscription.claimedPackages} subscriptionId={id} />
                    )
                })}
            </div>
            <div className='px-3 py-2 flex flex-col gap-4 items-center justify-center'>
                {subscription.status === 'active' ? (
                    <Button variant='neutral' size='full' className='flex items-center gap-2' >
                        Pause Subscription  <CirclePause size={15} />
                    </Button>
                ) : (
                    <Button variant='success' size='full' className='flex items-center gap-2' >
                        Pause Subscription
                    </Button>
                )}
                <Button variant='danger' size='full' className='flex items-center gap-2' >
                    Cancel Subscription <Trash size={15} />
                </Button>
            </div>
        </main>
    )
}

export default SubscriptionDetail