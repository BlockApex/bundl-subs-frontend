import Image from 'next/image'
import React from 'react'
import EmailInput from './EmailInput'
import LogoSlider from './LogoSlider'
import AnimatedText from './AnimatedText'




const Hero = () => {
    return (
        <div className='w-full max-w-6xl mx-auto h-auto overflow-hidden py-6 mt-6'>
            <div className='grid grid-cols-3'>
                <section className='flex flex-col items-end justify-start py-10' >
                    <div>
                        <h1 className='text-5xl font-normal text-black text-right'>
                            Too many
                        </h1>
                        <AnimatedText />
                    </div>
                    <br />
                    <br />
                    <br />
                    <p className='text-lg text-foreground-web text-right w-sm mt-10'>
                        Bundl helps you fund and manage all your subscriptions in one place,unlocking exclusive discounts while offsetting costs with yield on idle assets
                    </p>
                </section>
                <section className='w-full flex flex-col gap-4 items-center justify-center'>
                    <Image src='/assets/landing/hero/mob.svg' alt='Hero Image' width={300} height={400} />
                    <Image src='/assets/landing/hero/solana.svg' alt='Solana Image' width={150} height={100} />
                </section>
                <section className='flex flex-col items-start justify-start py-10'>
                    <LogoSlider />
                    <div className='mt-10'>
                        <h1 className='text-5xl font-normal text-black text-left'>
                            Take back
                            <br />
                            control.
                        </h1>
                        <br />
                        <EmailInput />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Hero