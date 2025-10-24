'use client'
import React from 'react'
import { useAuthStore } from '../store/authStore';
import UserBalance from './UserBalance';
import ActiveBundles from './ActiveBundles';

const UserHomeView = () => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) return null
    return (
        <div className='w-full h-auto relative p-2'>
            <UserBalance />
            <br/>
            <ActiveBundles/>
        </div>
    )
}

export default UserHomeView