import React from 'react'
import { Modal } from '../common/Modal'
import Image from 'next/image';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '../common/Button';

interface PaymentSuccessProps {
    open: boolean;
    setOpen: (o: boolean) => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ open, setOpen }) => {
    return (
        <Modal title='' isOpen={open} onClose={() => setOpen(false)} h={80}>
            <div className='w-full h-auto relative'>
                <section className='flex flex-col items-center justify-center gap-4 p-4'>
                    <Image src='/assets/tick.svg' alt='Success' width={150} height={150} />
                    <h5 className='text-xl font-semibold text-black'>
                        Bundle Activated! 🎉
                    </h5>
                    <p className='text-base text-foreground font-normal text-center'>
                        Your subscriptions are now active and ready to use
                    </p>
                </section>


                <section className='w-full lg:max-w-lg  mx-auto border border-gray-400 rounded-xl p-4 mt-6'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-base text-black font-normal'>Monthly Charge</p>
                        <p className='text-base text-primary font-normal'>$50.00</p>
                    </div>
                    <hr className='border-b border-primary' />
                    <div className='flex items-center justify-between my-2'>
                        <p className='text-base text-black font-normal'>Next Billing Date</p>
                        <p className='text-base text-black font-normal'>November 15, 2025</p>
                    </div>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-base text-black font-normal'>Payment Method</p>
                        <p className='text-base text-black font-normal'>Smart Balance</p>
                    </div>
                </section>
                <section className='w-full lg:max-w-lg mx-auto bg-primary/20 rounded-lg p-4 mt-4  '>
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h6 className='text-lg font-normal text-black mb-0 flex items-center gap-2'><TrendingUp className='text-primary' size={18} />Smart Balance</h6>
                            <p className='text-sm text-black font-normal p-0 my-0'>
                                Earning yield to cover your subscriptions
                            </p>
                        </div>
                    </div>
                </section>
                <section className='w-full lg:max-w-lg  mx-auto border border-gray-400 rounded-xl p-4 my-6'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-base text-black font-normal'>Remaining Balance</p>
                        <p className='text-base text-primary font-normal'>$650.00</p>
                    </div>
                </section>
                <Button variant='dark' size='full' className='flex items-center gap-2' >
                    View Dashboard  <ChevronRight size={18} />
                </Button>
            </div>
        </Modal>
    )
}

export default PaymentSuccess