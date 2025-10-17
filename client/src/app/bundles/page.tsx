import React from 'react'
import AppLayout from '../components/common/AppLayout'
import BundleCard from '../components/BundleCard'



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


const AllBundles = () => {
    return (
        <AppLayout>
            <main className="w-full min-h-screen relative overflow-hidden px-0 lg:px-4">

                <div className='flex flex-col gap-8 mt-4 p-2'>
                    {data.map((b, i) => {
                        return (
                            <BundleCard bundle={b} key={i} />
                        )
                    })}
                </div>
            </main>
        </AppLayout>
    )
}

export default AllBundles