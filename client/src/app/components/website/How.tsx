"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    tag: "Step 1",
    title: "Connect your Wallet",
    description: "Pick the subscriptions you use. Bundl shows your all-in monthly cost and bundle savings in real time.",
    image: "/assets/landing/how/screen/1.svg",
  },
  {
    tag: "Step 2",
    title: "Choose how to pay",
    description: "Pay the way that fits your cashflow. You can switch anytime.",
    image: "/assets/landing/how/screen/2.svg",
  },
  {
    tag: "Step 3",
    title: "Confirm & activate",
    description: "Review your bundle, set billing cycle, and approve to start.",
    image: "/assets/landing/how/screen/3.svg",
  },
  {
    tag: "Step 4",
    title: "Track & control everything",
    description: "One dashboard for all subscriptions on Bundl.",
    image: "/assets/landing/how/screen/4.svg",
  },
];

const How = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all except first
      textRefs.current.forEach((el, i) => {
        if (i !== 0) gsap.set(el, { autoAlpha: 0 });
      });
      imageRefs.current.forEach((el, i) => {
        if (i !== 0) gsap.set(el, { autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      });

      steps.forEach((_, i) => {
        if (i === 0) return;

        tl.to([textRefs.current[i - 1], imageRefs.current[i - 1]], { autoAlpha: 0, duration: 0.5 })
          .to([textRefs.current[i], imageRefs.current[i]], { autoAlpha: 1, duration: 0.5 }, "<");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden flex">
      {/* Left Text */}
      <div className="w-1/2 flex flex-col justify-center px-12 relative">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { if (el) textRefs.current[i] = el }}
            className="absolute"
          >
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{step.tag}</span>
            <h2 className="text-4xl font-bold text-foreground mt-4">{step.title}</h2>
            <p className="text-lg text-muted-foreground mt-2">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Right Image */}
      <div className="w-1/2 flex justify-center items-center relative">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { if (el) imageRefs.current[i] = el }}
            className="absolute w-80 h-[420px]"
          >
            <Image src={step.image} alt={step.title} fill className="object-cover rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default How;
