import React from 'react'
import Button from './Button'

const EmailInput = () => {
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
            <Button>
                Join Waitlist
            </Button>
        </div>

    )
}

export default EmailInput