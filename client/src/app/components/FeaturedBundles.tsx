import Link from 'next/link'
import React from 'react'
import BundleCard from './BundleCard'




const data = [
    {
        title: 'Developer Essentials',
        items: [
            {
                image: '/assets/mock/bundle/1.png'
            },
            {
                image: '/assets/mock/bundle/2.png'
            },
            {
                image: '/assets/mock/bundle/3.png'
            },
            {
                image: '/assets/mock/bundle/4.png'
            },
            {
                image: '/assets/mock/bundle/1.png'
            },
            {
                image: '/assets/mock/bundle/2.png'
            },
            {
                image: '/assets/mock/bundle/3.png'
            },
            {
                image: '/assets/mock/bundle/4.png'
            },
        ],
        price: 47.32,
        savings: 8.18,
        percent: 15,
        dark: false
    },
    {
        title: 'Trader Bundle',
        items: [
            {
                image: '/assets/mock/bundle/1.png'
            },
            {
                image: '/assets/mock/bundle/2.png'
            },
            {
                image: '/assets/mock/bundle/3.png'
            },
            {
                image: '/assets/mock/bundle/4.png'
            },
            {
                image: '/assets/mock/bundle/1.png'
            },
            {
                image: '/assets/mock/bundle/2.png'
            },
            {
                image: '/assets/mock/bundle/3.png'
            },
            {
                image: '/assets/mock/bundle/4.png'
            },
        ],
        price: 47.32,
        savings: 8.18,
        percent: 15,
        dark: true
    },
    
]
const FeaturedBundles = () => {
    return (
        <div className='w-full h-auto relative p-2'>
            <div className='flex items-center justify-between'>
                <p className='text-base text-foreground font-normal '>Featured Bundles</p>
                <Link href='/' className='text-base text-primary '>See All</Link>
            </div>
            <div className='flex flex-col gap-8 mt-4'>
                {data.map((b, i) => {
                    return (
                        <BundleCard bundle={b} key={i} />
                    )
                })}
            </div>
        </div>
    )
}

export default FeaturedBundles