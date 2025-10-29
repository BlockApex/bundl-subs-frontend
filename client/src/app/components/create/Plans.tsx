import { ChevronRight, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../common/Button'

const data = [
    {
        title: '10%',
        count: '2+',
        bg: 'bg-[linear-gradient(135deg,rgba(187,115,0,0.2)_0%,rgba(0,187,167,0.05)_100%)]'
    },
    {
        title: '15%',
        count: '3+',
        bg: 'bg-[linear-gradient(135deg,rgba(0,184,219,0.2)_0%,rgba(0,184,219,0.05)_100%)]'
    },
    {
        title: '20%',
        count: '5+',
        bg: 'bg-[linear-gradient(135deg,rgba(43,127,255,0.2)_0%,rgba(43,127,255,0.55)_100%)]'
    },
]

interface PlansProps {
    onClick: () => void
}

const Plans: React.FC<PlansProps> = ({ onClick }) => {
    return (
        <div className='w-full relative'>
            <section className='w-full bg-dark rounded-b-xl px-4'>
                <br />
                <div className='flex items-center justify-center'>
                    <h5 className={`text-xl font-normal text-white`}>
                        Build your first Bundle
                    </h5>
                </div>
                <div className='w-full flex flex-col items-center justify-end mt-6'>
                    <Image src='/assets/create.svg' alt='Create Bundle' width={200} height={200} />
                </div>
            </section>
            <section className='w-full p-4 mt-4'>
                <p className='text-base text-black font-normal flex items-center gap-2'><TrendingUp className='text-primary' /> Discount Tiers</p>
                <p className='text-base text-foreground font-normal mt-2'>
                    Stack your savings! These discounts apply on top of any existing subscription deals.
                </p>
                <div className='w-full h-full flex items-center justify-center gap-2 lg:gap-6 mt-6'>
                    {data.map((p, i) => {
                        return (
                            <div className={`w-full  min-h-[220px] lg:min-h-[300px] p-4 flex flex-col items-center justify-center gap-2 rounded-xl ${p.bg}`} key={i}>
                                <p className='text-base text-foreground font-normal text-center '>
                                    Upto
                                </p>
                                <h1 className='text-3xl lg:text-6xl  font-normal text-black text-center'>
                                    {p.title}
                                </h1>
                                <p className='text-base text-foreground font-normal text-center '>
                                    off
                                </p>
                                <span className='border-b  h-1 border-dashed border-gray-400 block w-full my-2' />
                                <p className='text-base text-black font-normal text-center '>
                                    {p.count}
                                </p>
                                <p className='text-base text-foreground font-normal text-center '>
                                    services
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className='w-full lg:max-w-lg mx-auto bg-primary/20 rounded-lg p-4 my-4  '>
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h6 className='text-lg font-normal text-black mb-0 flex items-center gap-2'>🔒 Privacy-first:</h6>
                            <p className='text-sm text-black font-normal p-0 my-0'>
                                Your identity isn&apos;t directly linked to your wallet. We use advanced privacy tech to keep your data secure.
                            </p>
                        </div>
                    </div>
                </div>
                <Button onClick={onClick} variant='dark' size='full' className='flex items-center gap-2 mt-6' >
                    Start Bundling  <ChevronRight size={18} />
                </Button>
            </section>
        </div>
    )
}

export default Plans