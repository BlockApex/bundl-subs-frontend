import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className='w-full h-auto max-w-screen-2xl mx-auto relative overflow-hidden p-4 mt-4'>
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo and social icons */}
                <div className="flex flex-col gap-4">
                    <section className='flex items-center gap-4'>
                        <Image src='/assets/landing/logo.svg' alt='Logo' width={60} height={60} />
                        <h2 className='text-3xl text-primary-web font-semibold'>Bundl</h2>
                    </section>
                    <div className="flex items-center gap-3 mt-2">
                        <Image src="/assets/landing/social/1.svg" alt="X" width={50} height={50} />
                        <Image src="/assets/landing/social/2.svg" alt="Instagram" width={50} height={50} />
                        <Image src="/assets/landing/social/3.svg" alt="LinkedIn" width={50} height={50} />
                    </div>
                </div>

                {/* Navigation links */}
                <div>
                    <h4 className="font-semibold text-black mb-3">Home</h4>
                    <ul className="flex flex-col gap-2 text-base mt-4">
                        <li>Features</li>
                        <li>How it Works</li>
                        <li>Merchant</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-black mb-3">Support</h4>
                    <ul className="flex flex-col gap-2 text-base mt-4">
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-black mb-3">Social</h4>
                    <ul className="flex flex-col gap-2 text-base mt-4">
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>LinkedIn</li>
                        <li>Instagram</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-black mb-3">Legal</h4>
                    <ul className="flex flex-col gap-2 text-base mt-4">
                        <li>Cookie Policy</li>
                        <li>Terms of Use</li>
                        <li>Disclaimer</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
