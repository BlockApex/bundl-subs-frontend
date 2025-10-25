import PaymentHeader from '@/app/components/payment/Header'
import PaymentForm from '@/app/components/payment/PaymentForm'
import React from 'react'

const BundlePayment = () => {
    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            <PaymentHeader />
            <div className='my-4 p-4'>
                <h5 className='text-lg text-black'>
                    Dev Monk Bundle
                </h5>
            </div>
            <PaymentForm />
        </main>
    )
}

export default BundlePayment