"use client"
import React, { useState } from 'react'
import AppLayout from '../../components/common/AppLayout'
import Plans from '../../components/create/Plans'
import MakeBundle from '../../components/create/MakeBundle'

const CreateBundlePage = () => {
    const [formScreen, setFormScreen] = useState(true);

    return (
        <AppLayout showTopbar={false}>
            <main className="w-full min-h-screen relative overflow-hidden pb-12">
                {formScreen ? (
                    <MakeBundle onClick={() => setFormScreen(false)} />
                ) : (
                    <Plans onClick={() => setFormScreen(true)} />
                )}

            </main>
        </AppLayout>
    )
}

export default CreateBundlePage