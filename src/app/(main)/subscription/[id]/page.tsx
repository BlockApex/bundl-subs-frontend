'use client'
import { useParams } from 'next/navigation'

import { Button } from '@/app/components/common/Button'
import BundleDetailHeader from '@/app/components/details/Header'
import { ChevronRight, CirclePause, PlayCircle, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Subscription } from '@/app/types/bundle.types'
import { cancelSubscription, getSubscriptionById, pauseSubscription, resumeSubscription } from '@/app/services/bundle.service'
import toast from 'react-hot-toast'
import { Spinner } from '@/app/components/common/Spinner'
import SubscriptionCard from '@/app/components/SubscriptionCard'
import { AxiosError } from 'axios'
import { Modal } from '@/app/components/common/Modal'
import Link from 'next/link'


const SubscriptionDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [flag, setFlag] = useState(false);
    const [pauseOpen, setPauseOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);

    useEffect(() => {
        const fetchSubscription = async () => {
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
        fetchSubscription();
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



    const handlePause = async () => {
        try {
            setActionLoading(true);
            await pauseSubscription(id);
            setPauseOpen(false);
            // setFlag(!flag);
            setSubscription({ ...subscription, status: 'paused' });
            toast.success("Subscription has been paused successfully!");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to pause subscription");
                return;
            }
            toast.error((err as Error)?.message || "Something went wrong while pausing");
        } finally {
            setActionLoading(false);
        }
    }


    const handleResume = async () => {
        try {
            setActionLoading(true);
              await resumeSubscription(id);
            setResumeOpen(false)
            setSubscription({ ...subscription, status: 'active' });
            // setFlag(!flag);
            toast.success("Subscription has been resumed successfully!");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to resume subscription");
                return;
            }
            toast.error((err as Error)?.message || "Something went wrong while resuming");
        } finally {
            setActionLoading(false);
        }
    }



    const handleCancel = async () => {
        try {
            setActionLoading(true);
              await cancelSubscription(id);
            setCancelOpen(false)
            setSubscription({ ...subscription, status: 'cancelled' });
            // setFlag(!flag);
            toast.success("Subscription has been cancelled successfully!");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to cancel subscription");
                return;
            }
            toast.error((err as Error)?.message || "Something went wrong while cancelling");
        } finally {
            setActionLoading(false);
        }
    }

    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            <BundleDetailHeader bundle={subscription.bundle} subscription={true} />
            <div className='w-full h-[600px] lg:h-[550px] overflow-y-scroll flex flex-col gap-4 p-4 mt-2'>
                {subscription && subscription.bundle.selectedPackages.map((s, i) => {
                    return (
                        <SubscriptionCard refetch={() => setFlag(!flag)} subscription={s} key={i} claimedPackages={subscription.claimedPackages} subscriptionId={id} />
                    )
                })}
            </div>
            <div className='px-3 py-2 flex flex-col gap-4 items-center justify-center'>
                {subscription.status === 'active' ? (
                    <Button onClick={() => setPauseOpen(true)} variant='neutral' size='full' className='flex items-center gap-2' >
                        Pause Subscription  <CirclePause size={15} />
                    </Button>
                ) : subscription.status === 'paused' ? (
                    <Button onClick={() => setResumeOpen(true)} variant='success' size='full' className='flex items-center gap-2' >
                        Resume Subscription
                    </Button>
                ) : ''}


                {subscription.status === 'active' ? (
                    <Button onClick={() => setCancelOpen(true)} variant='danger' size='full' className='flex items-center gap-2' >
                        Cancel Subscription <Trash size={15} />
                    </Button>
                ) : subscription.status === 'cancelled' ? (
                    <Button variant='success' size='full' className='flex items-center gap-2' >
                        <Link href={`/payment/${subscription.bundle._id}`}>
                        
                        Restore Subscription
                        </Link>
                    </Button>
                ) : ''}
            </div>

            {/* Pause Modal */}
            <Modal title="" isOpen={pauseOpen} onClose={() => setPauseOpen(false)}>
                <div className='w-full flex-col items-center justify-center gap-4 p-4'>
                    <h4 className='text-lg text-black text-center mb-4 flex flex-col items-center justify-center'>
                        <span className='w-10 h-10 bg-blue-200/50 rounded-xl flex items-center justify-center text-center mb-2'>
                            <CirclePause />
                        </span>
                        Are you sure you want to pause this bundle?
                    </h4>
                    <div className='p-4 bg-blue-200/50 rounded-xl my-4'>
                        <p className='text-left'>
                            Your bundle will remain active until the end of the current billing cycle. After that, it will be paused and won&apos;t renew until you choose to reactivate it. You&apos;ll still have full access to your subscriptions for the remainder of this cycle
                        </p>
                    </div>
                    <Button
                        variant="dark"
                        size="full"
                        className="mt-4 flex items-center gap-2"
                        onClick={handlePause}
                        loading={actionLoading}
                    >
                        Pause <ChevronRight size={16} />
                    </Button>
                </div>
            </Modal>

            {/* Resume Modal */}
            <Modal title="" isOpen={resumeOpen} onClose={() => setResumeOpen(false)}>
                <div className='w-full flex-col items-center justify-center gap-4 p-4'>
                    <h4 className='text-lg text-black text-center mb-4 flex flex-col items-center justify-center'>
                        <span className='w-10 h-10 bg-blue-200/50 rounded-xl flex items-center justify-center text-center mb-2'>
                            <PlayCircle />
                        </span>
                        Are you sure you want to add this subscription between the cycle?
                    </h4>
                    <div className='p-4 bg-green-200/50 rounded-xl my-4'>
                        <p className='text-left'>
                            You’re adding a new subscription between the cycle. We’ll align its billing with your existing bundle starting next month. For this cycle, you’ll have immediate access, and the cost will be adjusted accordingly
                        </p>
                    </div>
                    <Button
                        variant="dark"
                        size="full"
                        className="mt-4 flex items-center gap-2"
                        onClick={handleResume}
                        loading={actionLoading}
                    >
                        Resume <ChevronRight size={16} />
                    </Button>
                </div>
            </Modal>


            {/* Cancel Modal */}
            <Modal title="" isOpen={cancelOpen} onClose={() => setCancelOpen(false)}>
                <div className='w-full flex-col items-center justify-center gap-4 p-4'>
                    <h4 className='text-lg text-black text-center mb-4 flex flex-col items-center justify-center'>
                        <span className='w-10 h-10 bg-danger/20 rounded-xl flex items-center justify-center text-center mb-2'>
                            <Trash />
                        </span>
                        Are you sure you want to cancel
                        this subscription within this Bundle
                    </h4>
                    <div className='p-4 bg-danger/20 rounded-xl my-4'>
                        <p className='text-left'>
                            You’re adding a new subscription between the cycle. We’ll align its billing with your existing bundle starting next month. For this cycle, you’ll have immediate access, and the cost will be adjusted accordingly
                        </p>
                    </div>
                    <Button
                        variant="dark"
                        size="full"
                        className="mt-4 flex items-center gap-2"
                        onClick={handleCancel}
                        loading={actionLoading}
                    >
                        Cancel <ChevronRight size={16} />
                    </Button>
                </div>
            </Modal>
        </main>
    )
}

export default SubscriptionDetail