'use client'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore';
import UserBalance from './UserBalance';
import ActiveBundles from './ActiveBundles';
import toast from 'react-hot-toast';
import { getUserStats } from '../services/auth.service';
import { Spinner } from './common/Spinner';

const UserHomeView = () => {
    const { isAuthenticated } = useAuthStore();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const data = await getUserStats();
                console.log(data);
                setStats(data);
            } catch (err: unknown) {
                toast.error(
                    err instanceof Error
                        ? err.message || "Failed to fetch stats"
                        : "Failed to fetch stats"
                );
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchActivities();
        }
    }, []);



    if (!isAuthenticated) return null


    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }
    return (
        <div className='w-full h-auto relative p-2'>
            <UserBalance lastData={stats?.lastPaymentDate} paymentsDueNext30Days={stats?.paymentsDueNext30Days} />
            <br />
            <ActiveBundles />
        </div>
    )
}

export default UserHomeView