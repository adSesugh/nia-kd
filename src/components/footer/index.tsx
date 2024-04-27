import Image from 'next/image'
import React from 'react'
import styles from '@/styles/footer.module.css'
import Link from 'next/link'

const NIAFooter = () => {
    return (
        <div className={styles.footer}>
            <div className='flex items-center justify-center'>
                <Image src={'/assets/images/pattern.svg'} alt='pattern' width={1440} height={93.32} />
            </div>
            <div id='footer' className='sm:px-28 xs:px-6'>
                <div className='grid sm:grid-cols-3 xs:grid-cols-1 gap-16 pt-20'>
                    <div className='flex flex-col gap-3 text-white'>
                        <Image alt='NIA-Kd' src={'/assets/images/nia_logo_white.svg'} width={175} height={66.08} />
                        <p className='pt-2 font-normal text-[15px]'>The Nigerian Institute of Architects Kaduna Chapter was founded on the 1st of April 1960, as an association of independent professional architects with the aim of fostering friendship.</p>
                        <div className='flex items-center gap-4 pt-4'>
                            <Link href={'/'} target='_blank'>
                                <Image src={'/assets/icons/linkedin-24px.svg'} alt='linkedin' height={24} width={24} />
                            </Link>
                            <Link href={'/'} target='_blank'>
                                <Image src={'/assets/icons/facebook-24px.svg'} alt='linkedin' height={24} width={24} />
                            </Link>
                            <Link href={'/'} target='_blank'>
                                <Image src={'/assets/icons/new-twitter-24px.svg'} alt='linkedin' height={24} width={24} />
                            </Link>
                            <Link href={'/'} target='_blank'>
                                <Image src={'/assets/icons/youtube-24px.svg'} alt='linkedin' height={24} width={24} />
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col xs:items-start sm:items-center text-white'>
                        <h1>{'Links'.toUpperCase()}</h1>
                        <ul className='sm:space-y-2 sm:pl-6 xs:space-y-0 xs:space-x-6 sm:space-x-0 xs:pl-0 sm:gap-4 sm:pt-4 sm:block xs:flex xs:flex-wrap xs:justify-center'>
                            <li className='text-[15px]'>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li className='text-[15px]'>
                                <Link href={'/events'}>Events</Link>
                            </li>
                            <li className='text-[15px]'>
                                <div className={styles.menuitem}>
                                    <Link href={'/blog'}>Blog</Link>
                                </div>
                            </li>
                            <li className='text-[15px]'>
                                <Link href={'/about'}>About Us</Link>
                            </li>
                            <li className='text-[15px]'>
                                <Link href={'/contact'}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3 text-white'>
                        <h1>{'Contacts'.toUpperCase()}</h1>
                        <div className='flex gap-4'>
                            <Image src={'/assets/icons/location.svg'} alt='address' height={24} width={24} />
                            <span className='text-white text-[15px]'>24, Magaji Muazu Crescent, Katampe Extension, FCT - Abuja Nigeria</span>
                        </div>
                        <div className='flex gap-4'>
                            <Image src={'/assets/icons/phone.svg'} alt='phone' height={24} width={24} />
                            <span className='text-white text-[15px]'>+234 9-2900081 or +234 9-2900082</span>
                        </div>
                        <div className='flex gap-4'>
                            <Image src={'/assets/icons/mail.svg'} alt='mail' height={24} width={24} />
                            <span className='text-white text-[15px]'><Link href={'mailto://organization@gmail.com'}>organization@gmail.com</Link></span>
                        </div>
                    </div>
                </div>
                <div className='w-full pt-28'>
                    <hr className='h-[2px] w-full text-[#F3ECE2]'  />
                    <p className='text-center w-full text-[#F3ECE2] text-[14px] py-4'>Copyright &copy;&nbsp;{new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export default NIAFooter