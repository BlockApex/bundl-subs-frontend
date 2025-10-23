import CTA from '@/app/components/website/CTA'
import Features from '@/app/components/website/Features'
import Footer from '@/app/components/website/Footer'
import Hero from '@/app/components/website/Hero'
import How from '@/app/components/website/How'
import HowMob from '@/app/components/website/HowMob'
import Merchant from '@/app/components/website/Merchant'
import Navbar from '@/app/components/website/Navbar'
import React from 'react'

const Landing = () => {
  return (
    <div className='w-full h-auto relative overflow-hidden'>
      <Navbar />
      <Hero />
      <Features />
      <How />
      <HowMob />
      <Merchant />
      <CTA />
      <Footer />
    </div>
  )
}

export default Landing