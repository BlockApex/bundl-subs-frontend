'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Wallet2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { getVerificationMessage, login } from '@/app/services/auth.service';
import { useAuthStore } from '@/app/store/authStore';
import bs58 from "bs58";



const Wallet = () => {
    const { connected, publicKey, signMessage, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { isAuthenticated, setAuthenticated } = useAuthStore();


    const handleAuthFlow = useCallback(async () => {
        if (!publicKey || !signMessage) return;

        try {
            setIsAuthenticating(true);

            // Step 1: Get verification message from backend
            const response = await getVerificationMessage();
            if (!response?.message) throw new Error('Invalid verification message.');

            // Step 2: Sign message with wallet
            const encodedMessage = new TextEncoder().encode(response.message);
            const signature = await signMessage(encodedMessage);

            // Step 3: Convert to base58
            const publicKeyString = publicKey.toBase58();
            const signatureBase58 = bs58.encode(signature);

            // Step 4: Login API call
            const authResponse = await login(publicKeyString, signatureBase58);
            console.log(authResponse, 'LOGIN RESPONSE');

            // ✅ Mark user as authenticated in Zustand
            setAuthenticated(true);

            toast.success('Login successful!');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Auth flow failed:', err);
                toast.error(err.message || 'Authentication failed. Please try again.');
            } else {
                console.error('Unknown error:', err);
                toast.error('Authentication failed. Please try again.');
            }
            disconnect();
        } finally {
            setIsAuthenticating(false);
        }
    }, [publicKey, signMessage, disconnect, setAuthenticated]);

    // ✅ Automatically authenticate after wallet connection
    useEffect(() => {
        if (connected && !isAuthenticated) {
            handleAuthFlow();
        }
    }, [connected, isAuthenticated, handleAuthFlow]);



    return (
        <div className="flex flex-col items-center gap-3">
            <button
                className="wallet_button"
                onClick={() => {
                    if (connected) handleAuthFlow();
                    else setVisible(true);
                }}
                disabled={isAuthenticating}
            >
                <Wallet2 size={15} />
                {isAuthenticating ? 'Authenticating...'
                    : connected ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` : 'Connect'}
            </button>
        </div>
    );
};

export default Wallet;
