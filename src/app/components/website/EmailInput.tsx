"use client"
import React, { useState } from 'react'
import Button from './Button'
import toast from 'react-hot-toast';

const EmailInput = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {

        if (!email.trim()) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        // Simulate a network request
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("🎉 You’ve been added to the waitlist!");
            setEmail("");
        }, 1200);
    };
    return (
        <div
            className="
    flex items-center 
    justify-between 
    bg-white 
    border border-gray-300 
    rounded-2xl 
    overflow-hidden 
    transition-all duration-200
    focus-within:border-primary
    shadow-sm
    hover:shadow-md
  "
        >
            <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter Email"
                className="
      flex-1 
      px-4 py-3 
      text-gray-700 
      placeholder-gray-400 
      outline-none 
      bg-transparent
    "
            />
            <Button onClick={handleSubmit}>
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
        </div>

    )
}

export default EmailInput