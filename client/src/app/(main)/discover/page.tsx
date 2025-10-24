"use client"
import BundleCard from '@/app/components/BundleCard'
import AppLayout from '@/app/components/common/AppLayout'
import Input from '@/app/components/common/Input'
import { categories } from '@/app/config'
import { ChevronLeft, ListFilter, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'




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

const Discover = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(categories[0]);
    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden pb-12">
                <section className="w-full bg-dark rounded-b-xl px-4">
                    <br />
                    <div className="flex items-center justify-between gap-2">
                        <div className='flex items-center gap-2'>
                            <button
                                // onClick={onClick}
                                className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition"
                            >
                                <ChevronLeft className="text-white" />
                            </button>
                            <h5 className="text-xl font-normal text-white">
                                Discover
                            </h5>
                        </div>
                        <Link href='/create' className='text-base text-primary '>Create Your Own</Link>
                    </div>

                    <div className="w-full mt-6 pb-4">
                        <div className='relative flex items-center'>
                            <Input
                                label=""
                                value={search}
                                onChange={setSearch}
                                placeholder="Search subscriptions..."
                                className="text-white"
                                icon={<Search className="text-white" />}
                            />
                            <button className='absolute right-2 w-10 h-10 flex items-center justify-center bg-white/30 rounded-lg'>
                                <ListFilter size={20} className='text-white' />
                            </button>
                        </div>
                        <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setCategory(c)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all ${category.id === c.id
                                        ? "bg-primary/60 border-primary text-black"
                                        : "border-white text-white hover:bg-primary/20"
                                        }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <div className='flex flex-col gap-8 mt-4 p-4 h-[600px] lg:h-[500px] overflow-y-scroll'>
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

export default Discover