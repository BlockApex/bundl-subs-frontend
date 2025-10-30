"use client"
import React, { useState } from 'react'
import Plans from '../../components/create/Plans'
import MakeBundle from '../../components/create/MakeBundle'

const CreateBundlePage = () => {
    const [formScreen, setFormScreen] = useState(false);

    return (
            <main className="w-full min-h-screen relative overflow-hidden pb-12">
                {formScreen ? (
                    <MakeBundle onClick={() => setFormScreen(false)} />
                ) : (
                    <Plans onClick={() => setFormScreen(true)} />
                )}

            </main>
    )
}

export default CreateBundlePage