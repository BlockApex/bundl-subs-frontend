'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getVerificationMessage, login } from '@/app/services/auth.service';
import { useAuthStore } from '@/app/store/authStore';
import bs58 from 'bs58';
import toast from 'react-hot-toast';

export const useLogin = () => {
    const { connected, publicKey, signMessage, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const { isAuthenticated, setAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false);

    // 🔹 Step 1: Login logic
    const handleLogin = useCallback(async () => {
        if (!publicKey || !signMessage) {
            // open modal if not connected
            setVisible(true);
            return;
        }

        try {
            setLoading(true);

            // Get verification message from backend
            const response = await getVerificationMessage();
            if (!response?.message) throw new Error('Failed to get verification message');

            // Sign it
            const encodedMessage = new TextEncoder().encode(response.message);
            const signature = await signMessage(encodedMessage);

            // Convert and send to backend
            const publicKeyBase58 = publicKey.toBase58();
            const signatureBase58 = bs58.encode(signature);
            const authResponse = await login(publicKeyBase58, signatureBase58);

            console.log('✅ Auth response:', authResponse);

            setAuthenticated(true);
            toast.success('Login successful!');
        } catch (err: unknown) {
            console.error('❌ Login error:', err);
            toast.error('Login failed');
            disconnect();
        } finally {
            setLoading(false);
        }
    }, [publicKey, signMessage, disconnect, setVisible, setAuthenticated]);

    // 🔹 Step 2: Automatically trigger login after connecting
    useEffect(() => {
        if (connected && !isAuthenticated && !loading) {
            handleLogin();
        }
    }, [connected, isAuthenticated, handleLogin]);

    return {
        isAuthenticated,
        connected,
        loading,
        handleLogin,
    };
};
