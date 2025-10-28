'use client';
import React from 'react';
import { LogOut, Wallet2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuthStore } from '@/app/store/authStore';
import { useLogin } from '@/app/hooks/useLogin';
import toast from 'react-hot-toast';

const Wallet = () => {
    const { publicKey, disconnect } = useWallet();
    const { setAuthenticated } = useAuthStore();
    const { handleLogin, connected, isAuthenticated, loading } = useLogin();

    const handleLogout = async () => {
        try {
            await disconnect();
            setAuthenticated(false);
            toast.success('Logged out successfully.');
        } catch (error) {
            toast.error('Failed to logout. Try again.');
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {isAuthenticated && connected ? (
                <div className="flex items-center gap-2">
                    <p className="wallet_button">
                        <Wallet2 size={15} />
                        {publicKey?.toBase58().slice(0, 4)}...
                        {publicKey?.toBase58().slice(-4)}
                    </p>
                    <button className="wallet_button" onClick={handleLogout}>
                        <LogOut />
                    </button>
                </div>
            ) : (
                <button
                    className="wallet_button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    <Wallet2 size={15} />
                    {loading ? 'Authenticating...' : 'Connect'}
                </button>
            )}
        </div>
    );
};

export default Wallet;
