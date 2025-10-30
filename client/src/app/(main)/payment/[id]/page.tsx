
import React from 'react';
import PaymentHeader from '@/app/components/payment/Header';
import PaymentForm from '@/app/components/payment/PaymentForm';

const BundlePayment = () => {

    return (
        <main className="w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center gap-4">
            <PaymentHeader />
            <PaymentForm />

        </main>
    );
};

export default BundlePayment;
