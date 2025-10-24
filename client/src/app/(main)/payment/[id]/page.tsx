"use client"
import PaymentHeader from '@/app/components/payment/Header'
import PaymentForm from '@/app/components/payment/PaymentForm'
import PaymentSuccess from '@/app/components/payment/PaymentSuccess'
import React, { useState } from 'react'

const BundlePayment = () => {
    const [success, setSuccess] = useState(false);
    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            <PaymentHeader />
            <div className='my-4 p-4'>
                <h5 className='text-lg text-black'>
                    Dev Monk Bundle
                </h5>
            </div>
            <PaymentForm />
            <PaymentSuccess open={success} setOpen={setSuccess} />
        </main>
    )
}

export default BundlePayment