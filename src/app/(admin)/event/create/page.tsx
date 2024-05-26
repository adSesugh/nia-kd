'use client'

import React, { useEffect, useState } from 'react'

const CreateEvent = () => {
    const [step, setStep] = useState<string>('details')

    useEffect(() => {
        document.title = `Create Event | NIA-Kd`
    }, [])

    return (
        <div className='pb-5 bg-[#F5F5F5]'>
            <div className='flex h-[65px] justify-between px-16 items-center bg-white shadow-sm pt-1.5'>
                <h1 className='font-semibold'>Create Event</h1>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${step === 'details' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>1</div>
                        <span className='text-sm text-[#616161]'>Details</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${step === 'form' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>2</div>
                        <span className='text-sm text-[#616161]'>Form</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${step === 'email' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>3</div>
                        <span className='text-sm text-[#616161]'>Email</span>
                    </div>
                    <div className='flex items-center text-sm gap-1.5'>
                        <div className={`text-[11.5px] h-5 w-5 flex items-center justify-center rounded-full ${step === 'publish' ? 'bg-[#3ABC5E]' : 'bg-[#BEBEBE]'} text-white`}>4</div>
                        <span className='text-sm text-[#616161]'>Publish</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent