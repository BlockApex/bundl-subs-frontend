"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Wallet from './Wallet'
import Link from 'next/link'
import { getUserProfile } from '@/app/services/auth.service'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/app/store/authStore'
import { Spinner } from './Spinner'

const TopBar = () => {
    const { isAuthenticated } = useAuthStore();
    const [profile, setProfile] = useState<null | { name: string, email: string, profileImage?: string, country: string }>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const data = await getUserProfile();
                const  { kycInfo } = data;
                setProfile(kycInfo);
            } catch (err: unknown) {
                toast.error(
                    err instanceof Error
                        ? err.message || "Failed to fetch profile"
                        : "Failed to fetch profile"
                );
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            getProfile();
        }
    }, [isAuthenticated]);



    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }

    if (isAuthenticated && profile) {
        return (
            <div className='w-full bg-white z-50 lg:max-w-3xl mx-auto flex items-center justify-between gap-4 sticky top-0 left-0 right-0 p-4'>
                <Link href='/profile' className='flex items-center gap-2' >
                    {profile.profileImage ? <Image src={profile.profileImage} alt='User' width={40} height={40} className='rounded-full' /> :<Image src='/assets/logo.svg' alt='User' width={40} height={40} className='rounded-full' />} 
                    <div className='flex flex-col'>
                        <p className='text-base text-foreground font-normal'>Hey,👋</p>
                        <h6 className='text-lg text-black font-normal'> {profile.name}</h6>
                    </div>
                </Link>
                <section>
                    <Wallet />
                </section>
            </div>
        )
    }

    return (
        <div className='w-full bg-white z-50 lg:max-w-3xl mx-auto flex items-center justify-between gap-4 sticky top-0 left-0 right-0 p-4'>
            <section className='flex items-center gap-2' >
                <Image src='/assets/logo.svg' alt='User' width={40} height={40} className='rounded-full' />
                <div className='flex flex-col'>
                    <p className='text-base text-foreground font-normal'>Hey,👋</p>
                    <h6 className='text-lg text-black font-normal'> Bundler</h6>
                </div>
            </section>
            <section>
                <Wallet />
            </section>
        </div>
    )
}

export default TopBar