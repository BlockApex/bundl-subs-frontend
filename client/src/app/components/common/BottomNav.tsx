import { ChartColumn, House, Plus, RefreshCw, Wallet2 } from 'lucide-react'
import React from 'react'

const BottomNav = () => {
    return (
        <nav className='w-full lg:max-w-4xl mx-auto flex items-center justify-center fixed bottom-0 left-0 right-0 p-4'>
            <div className='w-full max-w-[100%] bg-dark p-2 rounded-xl flex items-center justify-around '>
                <div className='flex flex-col items-center gap-1'>
                    <House className='text-white w-5' />
                    <span className='text-white text-xs'>Bundle</span>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <ChartColumn className='text-white w-5' />
                    <span className='text-white text-xs'>Active</span>
                </div>
                <div className='flex flex-col items-center gap-1 bg-secondary w-16 rounded-xl py-2'>
                    <Plus className='text-black w-5' />
                    <span className='text-black text-xs font-semibold'>Build</span>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <RefreshCw className='text-white w-5' />
                    <span className='text-white text-xs'>Swap</span>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <Wallet2 className='text-white w-5' />
                    <span className='text-white text-xs'>Wallet</span>
                </div>
            </div>
        </nav>
    )
}

export default BottomNav