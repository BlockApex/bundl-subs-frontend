import Balance from '@/app/components/payment/Balance'
import PaymentHeader from '@/app/components/payment/Header'
import PaymentForm from '@/app/components/payment/PaymentForm'
import React from 'react'

const BundlePayment = () => {
    return (
        <main className="w-full min-h-screen relative overflow-hidden">
            <PaymentHeader />
            <Balance />
            <PaymentForm/>
        </main>
    )
}

export default BundlePayment