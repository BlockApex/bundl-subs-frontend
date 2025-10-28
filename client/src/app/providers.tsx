'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import type { WalletAdapter } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import {
//     PhantomWalletAdapter,
//     SolflareWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
// import toast from 'react-hot-toast';
import { SOLANA_RPC } from './config';

export const SolanaWalletProvider = ({ children }: { children: React.ReactNode }) => {

    const endpoint = SOLANA_RPC;

    const wallets = useMemo<WalletAdapter[]>(() => {
        const baseWallets: WalletAdapter[] = [
            // new PhantomWalletAdapter(),
            // new SolflareWalletAdapter(),
        ];

        return baseWallets;
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
