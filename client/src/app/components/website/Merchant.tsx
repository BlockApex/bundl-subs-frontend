import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const btn = `bg-primary-web 
        ps-4 pe-2 py-3 
        rounded-2xl 
        text-base text-black 
        flex items-center gap-4 
        transition-all duration-200 ease-in-out
        hover:bg-primary-dark/80
        hover:scale-[1.02] 
        active:scale-[0.97]
        active:brightness-90`
const icn = `w-6 h-8 bg-white 
          flex items-center justify-center 
          rounded-full 
          transition-colors duration-200 
          group-hover:bg-white/30`
const Merchant = () => {
    return (
        <div className='w-full h-auto max-w-full lg:max-w-screen-2xl mx-auto relative overflow-hidden p-4 mt-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 lg:p-0'>
                <section className='w-full h-full' >
                    <h1 className='text-3xl lg:text-5xl font-normal text-black'>
                        For Merchants Who Care
                    </h1>
                    <div className='flex flex-col gap-4 mt-10'>
                        <h5 className="text-xl text-black">
                            Earn trust, not just revenue.
                            <span className='border-b-6 border-primary-web/20 block max-w-xs' />
                        </h5>
                        <p className='text-base text-foreground-web max-w-md'>
                            Bundl empowers apps, creators, and SaaS platforms to accept private wallet payments and reach new users, without handling personal data.
                            Your customers stay in control, and you get paid instantly in USDC.
                        </p>
                    </div>
                    <br className='hidden lg:flex'  />
                    <br className='hidden lg:flex'  />
                    <br className='hidden lg:flex'  />
                    <br className='hidden lg:flex'  />
                    <div className='flex flex-col gap-4 mt-10'>
                        <h5 className="text-xl text-black">
                            Why merchants love Bundl
                            <span className='border-b-6 border-primary-web/20 block max-w-xs' />
                        </h5>
                        <ul className="text-base text-foreground-web list-disc flex flex-col gap-4 max-w-xl marker:text-primary-web marker:text-lg">
                            <li>
                                Zero-PII Checkout: Commit-bound receipts mean you never touch credit cards or identities, just verifiable payments.
                            </li>
                            <li>
                                Instant Settlements: Get paid in seconds on Solana. Refunds, prorations, and subscriptions are programmable by design.
                            </li>
                            <li>
                                Built-in Growth: Listing your app inside curated Bundles expose you to privacy-conscious users actively looking for tools to stack and save.
                            </li>
                            <li>
                                No Extra Work: Plug in once using REST or Web3 SDKs, Bundl handle payments, receipts, and renewals automatically.
                            </li>
                        </ul>
                    </div>
                </section>
                <section className='w-full flex flex-col items-center justify-center'>
                    <Image src='/assets/landing/merchant.svg' alt='Merchant' width={600} height={800} />
                    <div className='mt-6'>
                        <div className='w-full flex items-center gap-4'>
                            <button className={btn}>
                                Become a Partner
                                <span className={icn}>
                                    <ChevronRight size={20} />
                                </span>
                            </button>
                            <div className='px-6 py-2 border border-gray-300 rounded-xl'>
                                <Image src='/assets/landing/partner.svg' alt='icon' width={40} height={40} />
                            </div>
                        </div>
                        <br />
                        <div className='w-full flex items-center gap-4'>
                            <div className='px-6 py-2 border border-gray-300 rounded-xl'>
                                <Image src='/assets/landing/file.svg' alt='icon' width={30} height={30} />
                            </div>
                            <button className='px-6 py-4 rounded-2xl text-base text-black  border border-gray-100 bg-gray-100'>
                                Read Merchant Docs
                            </button>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Merchant