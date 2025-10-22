import React from 'react'
import Button from './Button'
import Image from 'next/image'

const Features = () => {
    return (
        <div className='w-full h-auto max-w-screen-2xl mx-auto relative overflow-hidden p-4 mt-4'>
            <section className='w-full flex items-center justify-between'>
                <h1 className='text-5xl font-normal text-black'>
                    One place. One payment.
                    <br />
                    Unify your subscriptions.
                </h1>
                <Button>
                    Launch dApp
                </Button>
            </section>
            <section className="w-full h-[300px] grid grid-cols-12 gap-6 mt-8">
                {/* Left Feature */}
                <div className="col-span-5 bg-primary-web/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-3xl font-normal text-black">
                            One Monthly <br /> Payment
                        </h2>

                        <p className="text-base text-foreground-web">
                            Less Mess More Control, <br /> No Surprises Renewals
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image
                            src="/assets/landing/features/1.svg"
                            alt="One Monthly Payment"
                            width={260}
                            height={260}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Right Feature */}
                <div className="col-span-7  bg-primary-web/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-3xl font-normal text-black">
                            Your idle funds
                            <br />
                            cut your bill
                        </h2>

                        <p className="text-base text-foreground-web max-w-md">
                            Deposit once; your idle funds will <br /> earn yields that automatically reduce your bill.
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image
                            src="/assets/landing/features/2.svg"
                            alt="Cut Your Bill"
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>
            <section className="w-full h-[300px] grid grid-cols-12 gap-6 mt-8">
                {/* Left Feature */}
                <div className="col-span-7  bg-primary-web/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-3xl font-normal text-black">
                            Track everything, <br /> on or off Bundl
                        </h2>

                        <p className="text-base text-foreground-web max-w-md">
                            Skip the spreadsheet. See every subscription <br />and bill in one place, whether you pay through Bundl or not.
                            .
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image
                            src="/assets/landing/features/3.svg"
                            alt="Your idle funds cut your bill"
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                </div>
                {/* Right Feature */}
                <div className="col-span-5 bg-primary-web/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-3xl font-normal text-black">
                            Save more with <br />Bundles
                        </h2>

                        <p className="text-base text-foreground-web">
                            Add More, Save More,
                            <br />
                            Preset or Custom Bundle
                        </p>
                    </div>
                    <div className="absolute bottom-6 right-6 ">
                        <Image
                            src="/assets/landing/features/4.svg"
                            alt="Save more with Bundles"
                            width={300}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className='w-full rounded-2xl bg-[#6D45FF] mt-10 flex items-center justify-center gap-6'>
                <h2 className="text-3xl font-normal text-white">
                    Powered by Arcium
                </h2>
                <Image
                    src="/assets/landing/features/shield.svg"
                    alt="Cut Your Bill"
                    width={400}
                    height={400}
                    className="object-contain"
                />
                <p className="text-base text-white">
                    Apps verify you’ve paid your wallet and <br /> other subscription stay hidden
                </p>
            </section>
        </div>
    )
}

export default Features