'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import type { WalletAdapter } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
// import toast from 'react-hot-toast';
import { SOLANA_RPC } from './config';
import { createDefaultAddressSelector, createDefaultAuthorizationResultCache, createDefaultWalletNotFoundHandler, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

export const SolanaWalletProvider = ({ children }: { children: React.ReactNode }) => {

    const endpoint = SOLANA_RPC;

    const wallets = useMemo<WalletAdapter[]>(() => {
        const baseWallets: WalletAdapter[] = [
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {

                    name: 'Bundl',
                    uri: 'https://www.bundlsubs.com/app', // ✅ remove trailing slash
                    icon: '/assets/logo.svg', // ✅ must be a relative path
                },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                chain: 'solana:devnet', // ✅ use `chain`, not `cluster`
                onWalletNotFound: createDefaultWalletNotFoundHandler(),

            }),
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
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
