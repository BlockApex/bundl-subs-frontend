import React from 'react'
import BottomNav from './BottomNav';
import TopBar from './TopBar';

interface AppLayoutProps {
    children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className='w-full h-auto relative'>
            <TopBar />
            {children}
            <BottomNav />
        </div>
    )
}

export default AppLayout