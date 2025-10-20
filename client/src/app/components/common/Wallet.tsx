'use client';

import React, { useEffect, useState } from 'react';
import { Wallet2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import toast from 'react-hot-toast';


const Wallet = () => {
    const { connected, publicKey, signMessage, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const [isAuthenticating, setIsAuthenticating] = useState(false);


    useEffect(()=>{
        if(connected){
            handleAuthFlow();
        }
    },[connected])

    const handleAuthFlow = async () => {
        if (!publicKey || !signMessage) return;

        try {
            setIsAuthenticating(true);
            // Step 1: get message from backend
            const { data } = await axios.get('/api/auth/request-message', {
                params: { address: publicKey.toBase58() },
            });
            // Step 2: user signs message
            const encodedMessage = new TextEncoder().encode(data.message);
            const signature = await signMessage(encodedMessage);

            // Step 3: verify signature (sets HttpOnly cookie)
            await axios.post(
                '/api/auth/verify',
                {
                    address: publicKey.toBase58(),
                    signature: Buffer.from(signature).toString('base64'),
                },
                { withCredentials: true }
            );
        } catch (err) {
            console.error('Auth flow failed:', err);
            toast.error('Authentication failed. Please try again.');
            disconnect();
        } finally {
            setIsAuthenticating(false);
        }
    };

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
