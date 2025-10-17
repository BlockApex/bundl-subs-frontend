import { ChevronLeft, Search } from 'lucide-react'
import React from 'react'
import Input from '../common/Input'

const MakeBundle = () => {
    return (
        <div className='w-full h-auto relative'>
            <section className='w-full bg-dark rounded-b-xl px-4'>
                <br />
                <div className='flex items-center justify-start gap-2'>
                    <button
                        className='w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition'
                    >
                        <ChevronLeft className='text-white' />
                    </button>
                    <h5 className={`text-xl font-normal text-white`}>
                        Build your first Bundle
                    </h5>
                </div>


                <div className='w-full mt-6 pb-4'>
                    <Input
                        label=""
                        value={''}
                        onChange={(e) => null}
                        placeholder="Search subscriptions..."
                        className=''
                        icon={<Search/>}
                    />
                </div>

            </section>
        </div>
    )
}

export default MakeBundle