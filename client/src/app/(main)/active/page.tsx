import React from 'react'
import AppLayout from '../../components/common/AppLayout'
// import BundleCard from '../../components/BundleCard'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const ActiveBundles = () => {
    return (
        <AppLayout>
            <main className="w-full min-h-screen relative overflow-hidden px-0 lg:px-4">
                <div className='flex items-center justify-between px-4 mt-4'>
                    <p className='text-base text-foreground font-normal '>Active Bundles </p>
                    <Link href='/bundles' className='text-base text-primary flex items-center gap-2'> <Plus size={17} /> Add More</Link>
                </div>
                <div className='flex flex-col gap-8 mt-4 p-2'>
                    {/* {data.map((b, i) => {
                        return (
                            <BundleCard bundle={b} key={i} />
                        )
                    })} */}
                </div>
            </main>
        </AppLayout>
    )
}

export default ActiveBundles