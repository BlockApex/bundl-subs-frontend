import AppLayout from '@/app/components/common/AppLayout'
import { Button } from '@/app/components/common/Button'
import BundleServices from '@/app/components/details/BundleServices'
import BundleDetailHeader from '@/app/components/details/Header'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const BundleDetail = () => {
  return (
    <main className="w-full min-h-screen relative overflow-hidden">
      <BundleDetailHeader />
      <BundleServices />
      <div className='px-3 py-2 flex items-center justify-center'>
        <Button variant='dark' size='full' className='flex items-center gap-2' >
          <Link href='/payment/1' className='flex items-center gap-2'>
            Subscribe <ChevronRight size={18} />
          </Link>
        </Button>
      </div>
    </main>
  )
}

export default BundleDetail