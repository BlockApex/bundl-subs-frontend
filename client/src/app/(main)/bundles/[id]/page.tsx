'use client'
import { useParams } from 'next/navigation'

import { Button } from '@/app/components/common/Button'
import BundleServices from '@/app/components/details/BundleServices'
import BundleDetailHeader from '@/app/components/details/Header'
import { ChevronRight, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Bundle } from '@/app/types/bundle.types'
import { getBundleById, prepareSubscription } from '@/app/services/bundle.service'
import toast from 'react-hot-toast'
import { Spinner } from '@/app/components/common/Spinner'
import { AxiosError } from 'axios'


const BundleDetail = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>()
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [_loading, _setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        setLoading(true);
        const data = await getBundleById(id);
        setBundle(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || 'Failed to fetch bundle');
        } else {
          toast.error('Failed to fetch bundle');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBundle();
  }, [id]);


  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="w-full min-h-screen text-center py-8 text-gray-500">
        No bundle available.
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Earn rewards by sharing this link!",
          url: window.location.href, // or your custom referral URL
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // fallback for devices/browsers that don't support native share
      alert("Sharing not supported on this device/browser");
    }
  };


  const handleRoute = async () => {
    try {
      _setLoading(true);
      const response = await prepareSubscription(bundle._id, 1);
      if (response) {
        router.push(`/payment/${bundle._id}`)
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Something went wrong");
        return;
      }
      toast.error((err as Error)?.message || "Something went wrong");
    } finally {
      _setLoading(false);
      console.log("🧹 Transaction attempt finished");
    }
  }
  return (
    <main className="w-full min-h-screen relative overflow-hidden">
      <BundleDetailHeader bundle={bundle} />
      <BundleServices bundle={bundle} />
      <div className='px-3 py-2 flex flex-col gap-2 items-center justify-center'>
        <Button
          onClick={handleShare}
          variant='secondary' size='full' className='gap-2'>
          Share & Earn <Share2 size={15} />
        </Button>
        <Button loading={_loading} onClick={handleRoute} variant='dark' size='full' className='flex items-center gap-2' >
          Subscribe <ChevronRight size={18} />
        </Button>
      </div>
    </main>
  )
}

export default BundleDetail