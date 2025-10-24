import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



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

]


const ActiveBundles = () => {
    const has = true;
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-base text-foreground font-normal '>Active Bundle</p>
            </div>
            {has ? (
                <div className='flex items-center flex-nowrap overflow-x-scroll gap-4 mt-2 cursor-pointer'>
                    {data.map((bundle, i) => {
                        const maxVisible = 4;
                        const visibleItems = bundle.items.slice(0, maxVisible);
                        const remainingCount = bundle.items.length - maxVisible;
                        // 🎨 Conditional styles
                        const bgColor = bundle.dark ? "bg-secondary-dark" : "bg-primary-dark";
                        const textColor = bundle.dark ? "text-black" : "text-white";
                        const borderColor = bundle.dark ? "border-black" : "border-white";
                        const shadow = bundle.dark
                            ? "shadow-[0px_18px_34.5px_0px_#FFBD1554]"
                            : "shadow-[0px_15px_28px_0px_#9DFFF4]";

                        return (
                            <div
                                className={`w-full h-auto p-4 rounded-xl min-w-[230px] ${shadow} ${bgColor}`}
                                key={i}
                            >
                                <div className="">
                                    <span className='px-2 py-1 text-white text-xs rounded-xl bg-primary/30' >Active</span>
                                    <h5 className={`text-base font-medium ${textColor}`}>{bundle.title}</h5>
                                </div>

                                <div className="flex items-center mt-4">
                                    {visibleItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`${i !== 0 ? "-ml-3" : ""} w-7 h-7 rounded-full border-2 ${borderColor} overflow-hidden`}
                                        >
                                            <Image
                                                src={item.image}
                                                alt="product"
                                                width={40}
                                                height={40}
                                                className="object-cover bg-white"
                                            />
                                        </div>
                                    ))}

                                    {remainingCount > 0 && (
                                        <p className={`ms-4 text-base font-normal ${textColor}`}>
                                            +{remainingCount} services
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='w-full h-auto p-4 rounded-xl border border-dashed border-gray-400 flex items-start gap-4'>
                    <Image src='/assets/cactus.svg' alt='No active bundle' width={60} height={60} />
                    <div className='flex flex-col'>
                        <h5 className={`text-xl font-medium text-foreground`}>
                            No active bundles yet
                        </h5>
                        <p className='text-base text-foreground'>
                            build one and invite friends to earn
                        </p>
                        <Link href='/create' className='text-base text-primary flex items-center gap-2 mt-1'>Create your first bundle <ArrowRight size={16} /> </Link>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ActiveBundles