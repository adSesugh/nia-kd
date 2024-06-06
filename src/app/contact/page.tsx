import Image from 'next/image'
import Link from 'next/link'
import SubHeader from '@/components/sub-header'
import React from 'react'

const Contact = () => {
  return (
    <div className='w-full'>
      <SubHeader title='Contact Us' subtitle={''} />
      <div className='flex sm:flex-row xs:flex-col-reverse justify-between sm:px-28 xs:px-6 py-16 pb-24'>
        <div className='sm:w-5/12 xs:w-full'>
          <div className='mb-8'>
            <h1 className='font-semibold xs:pt-4 sm:pt-0'>Physical address</h1>
            <div className='flex gap-4 pt-3'>
                <Image src={'/assets/icons/location.svg'} alt='address' height={24} width={24} />
                <span className='text-[15px] sm:w-8/12 xs:w-full'>24, Magaji Muazu Crescent, Katampe Extension, FCT - Abuja Nigeria</span>
            </div>
          </div>
          <div className='mb-8'>
            <h1 className='font-semibold'>Phone number</h1>
            <div className='flex gap-4 pt-3'>
                <Image src={'/assets/icons/phone.svg'} alt='phone' height={24} width={24} />
                <span className='text-[15px]'>+234 9-2900081 or +234 9-2900082</span>
            </div>
          </div>
          <div className='mb-8'>
            <h1 className='font-semibold'>Email address</h1>
            <div className='flex gap-4 pt-3'>
              <Image src={'/assets/icons/mail.svg'} alt='mail' height={24} width={24} />
              <span className='text-[15px]'><Link href={'mailto://organization@gmail.com'}>organization@gmail.com</Link></span>
            </div>
          </div>
        </div>
        <div className='sm:w-7/12 xs:w-full'>
          <div className='relative'>
            <img src='/assets/map.svg' alt='Contact Address' className='w-full rounded-2xl' />
            <button className='absolute top-4 left-4 py-3 px-6 bg-black text-white text-[14px] rounded-2xl'>
              View larger map
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact