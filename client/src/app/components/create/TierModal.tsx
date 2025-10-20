"use client"
import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import Image from 'next/image'

const s = {
  id: 1,
  name: "ChatGPT Plus",
  plan: "Advanced AI assistant",
  features: ["GPT-4 access", "Priority response", "Advanced features"],
  oldPrice: 20.0,
  newPrice: 18.0,
  discountPercent: 10,
  badge: "Plus",
  image: "/assets/mock/detail/1.png",
  trial: null,
}

interface TierModalProps {
  open: boolean
  setOpen: (o: boolean) => void
}

const TierModal: React.FC<TierModalProps> = ({ open, setOpen }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const tiers = [
    {
      name: "Standard",
      desc: "HD, 2 screens watching at a time.",
      price: s.newPrice,
    },
    {
      name: "Premium",
      desc: "4K Ultra HD, 4 screens watching at a time.",
      price: s.newPrice + 2,
    },
  ]

  return (
    <Modal title='' isOpen={open} onClose={() => setOpen(false)} h={80}>
      <div className='w-full h-auto relative px-2 py-8'>
        <div className="w-full h-full flex items-start justify-between gap-4">
          <Image
            src={s.image}
            alt={s.name}
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="w-full">
            <h6 className="text-md font-normal text-black">
              {s.name}
            </h6>
            <p className="text-sm text-foreground font-normal">
              Stream movies and TV shows
            </p>
            <div className="flex items-center justify-start gap-2 my-2">
              <span className="px-3 py-1 text-foreground text-sm bg-gray-200 rounded-lg">
                Entertainment
              </span>
              <span className="px-3 py-1 text-primary text-xs bg-primary/20 rounded-lg">
                {s.discountPercent}% off
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm text-foreground line-through">
                ${s.oldPrice.toFixed(2)}
              </p>
              <p className="text-base font-normal text-black">
                ${s.newPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-6'>
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.name
            return (
              <div
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`w-full rounded-2xl border p-4 cursor-pointer transition-all 
                  ${isSelected ? 'border-primary shadow-sm' : 'border-gray-300'}`}
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-lg text-black'>{tier.name}</p>
                    <p className="text-base font-normal text-black">
                      ${tier.price.toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`px-6 py-1 border rounded-xl text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-primary border-primary text-white'
                        : 'border-primary text-primary'
                      }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                </div>
                <hr className='border-b border-gray-200 my-4' />
                <p className='text-sm text-foreground'>{tier.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default TierModal
