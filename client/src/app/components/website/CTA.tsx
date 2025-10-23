import React from 'react'
import Button from './Button'
import Image from 'next/image'

const CTA = () => {
    return (
        <div className='w-full h-auto bg-primary-web relative overflow-hidden mt-4'>
            <div className='w-full h-[100px] absolute top-0'>
                <Image src="/assets/landing/line.png" fill alt="CTA" className="object-cover" />
            </div>
            <section className='flex flex-col items-center justify-center gap-6 p-4 mt-10 lg:mt-20'>
                <h1 className='text-3xl lg:text-5xl font-normal text-white text-center'>
                    Bundl turns subscription chaos into <br /> one simple stream.
                </h1>
                <p className="text-lg text-white text-center">
                    No more random billing dates, surprise charges or failed payments.
                </p>
                <div
                    className="
    flex items-center 
    justify-between 
    bg-primary-web 
    border border-white 
    rounded-2xl 
    overflow-hidden 
    transition-all duration-200
    focus-within:border-white
    shadow-sm
    hover:shadow-md
  "
                >
                    <input
                        placeholder="Enter Email"
                        className="
      flex-1 
      px-4 py-3 
      text-white
      placeholder-white 
      outline-none
      bg-transparent
    "
                    />
                    <Button dark={true}>
                        Join Waitlist
                    </Button>
                </div>
                <p className="text-base text-white text-center">
                    Get notified when Bundl goes live.
                </p>
            </section>
            <div className="w-full h-[700px] relative">
                <Image src="/assets/landing/cta.png" fill alt="CTA" className="object-cover" />
            </div>

        </div>
    )
}

export default CTA