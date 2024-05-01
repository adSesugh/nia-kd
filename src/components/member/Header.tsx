'use client'

import React from 'react'
import styles from '@/styles/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Calendar1, HambergerMenu, Home, Menu, MenuBoard, Ticket, Ticket2 } from 'iconsax-react'

const Header = () => {
 const pathname = usePathname()

    return (
        <header className={styles.header}>
            <div className={styles.menubarWrapper}>
                <Link href={'/'}>
                    <Image alt='NIA-Kd' src={'/assets/images/nia_logo_white.svg'} width={132} height={46.08} />
                </Link>
                <div className='xs:hidden sm:block'>
                    <ul className={styles.menubar}>
                        <li>
                        <div className={styles.menuitem}>
                            <Link href={'/member/dashboard'} className='flex items-center gap-2'>
                                <Home variant='Outline' size={20} color={`${pathname === '/member/dashboard' ? '#F2F2F2' : '#BFBFBF'}`} />
                                <span className={`${pathname === '/member/dashboard' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Home</span>
                            </Link>
                            {pathname === '/member/dashboard' && <div className={styles.menuActive}></div>}
                        </div>
                        </li>
                        <li>
                        <div className={styles.menuitem}>
                            <Link href={'/member/events'} className='flex items-center gap-2'>
                                <Calendar1 variant='Outline' size={20} color={`${pathname === '/member/events' ? '#F2F2F2' : '#BFBFBF'}`} />
                                <span className={`${pathname === '/member/events' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Events</span>
                            </Link>
                            {pathname.includes('/member/events') && <div className={styles.menuActive}></div>}
                        </div>
                        </li>
                        <li>
                        <div className={styles.menuitem}>
                            <Link href={'/member/dues'} className='flex items-center gap-2'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0013 18.3334C14.6037 18.3334 18.3346 14.6025 18.3346 10.0001C18.3346 5.39771 14.6037 1.66675 10.0013 1.66675C5.39893 1.66675 1.66797 5.39771 1.66797 10.0001C1.66797 14.6025 5.39893 18.3334 10.0013 18.3334Z" stroke={`${pathname === '/member/dues' ? '#F2F2F2' : '#BFBFBF'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14.2837 8.93221V9.76081H5.83203V8.93221H14.2837ZM14.2837 10.722V11.5506H5.83203V10.722H14.2837ZM13.422 5.83325V14.3181H12.4277L7.8041 7.65617H7.72124V14.3181H6.69377V5.83325H7.68809L12.3282 12.5118H12.4111V5.83325H13.422Z" fill="white"/>
                                </svg>
                                {/* <Image src={'/assets/icons/due-naira.svg'} alt='dues' className={`${pathname === '/member/dues' ? '#F2F2F2' : '#BFBFBF'}`} width={10} height={10} sizes='100vw' style={{ width: '18%', height: 'auto'}} /> */}
                                <span className={`${pathname === '/member/dues' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Annual Dues</span>
                            </Link>
                            {pathname.includes('/member/dues') && <div className={styles.menuActive}></div>}
                        </div>
                        </li>
                        <li>
                        <div className={styles.menuitem}>
                            <Link href={'/member/tickets'} className='flex items-center gap-2'>
                                <Ticket variant='Outline' size={20} color={`${pathname === '/member/tickets' ? '#F2F2F2' : '#BFBFBF'}`} />
                                <span className={`${pathname === '/member/tickets' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Tickets</span>
                            </Link>
                            {pathname.includes('/member/tickets') && <div className={styles.menuActive}></div>}
                        </div>
                        </li>
                        <li>
                        <div className={styles.menuitem}>
                            <Link href={'/member/certificates'} className='flex items-center gap-2'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.58333 18.3334C6.24422 18.3334 4.57466 18.3334 3.53733 17.113C2.5 15.8927 2.5 13.9284 2.5 10.0001C2.5 6.07171 2.5 4.10752 3.53733 2.88714C4.57466 1.66675 6.24422 1.66675 9.58333 1.66675C12.9224 1.66675 14.592 1.66675 15.6293 2.88714C16.4643 3.86951 16.6273 5.33386 16.659 7.91675" stroke={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6.66797 6.66675H12.5013M6.66797 10.8334H9.16797" stroke={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.3423 15.0878C17.0447 14.5765 17.5013 13.7478 17.5013 12.8125C17.5013 11.2592 16.2421 10 14.6888 10H14.4805C12.9271 10 11.668 11.2592 11.668 12.8125C11.668 13.7478 12.1246 14.5765 12.827 15.0878M16.3423 15.0878C15.8782 15.4257 15.3068 15.625 14.6888 15.625H14.4805C13.8625 15.625 13.2911 15.4257 12.827 15.0878M16.3423 15.0878L16.828 16.617C17.0132 17.2002 17.1059 17.4919 17.0806 17.6735C17.0278 18.0514 16.7196 18.332 16.3556 18.3333C16.1808 18.334 15.9188 18.1965 15.3949 17.9216C15.1702 17.8037 15.0579 17.7447 14.943 17.71C14.7088 17.6394 14.4605 17.6394 14.2263 17.71C14.1114 17.7447 13.9991 17.8037 13.7744 17.9216C13.2505 18.1965 12.9885 18.334 12.8136 18.3333C12.4497 18.332 12.1415 18.0514 12.0887 17.6735C12.0634 17.4919 12.1561 17.2002 12.3413 16.617L12.827 15.0878" stroke={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} stroke-width="1.5"/>
                                </svg>
                                {/* <Image src={'/assets/icons/certificate.svg'} className={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} alt='Certificate' width={10} height={10} sizes='100vw' style={{ width: '100%', height: 'auto'}} /> */}
                                <span className={`${pathname === '/member/certificates' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Certificates</span>
                            </Link>
                            {pathname.includes('member/certificates') && <div className={styles.menuActive}></div>}
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className={styles.loginRegister}>
                    <Link href={'/auth/login'} className={styles.loginButton}>Login</Link>
                    <Link href={'/auth/register'} className={styles.joinButton}>Join NIAKD</Link>
                    </div>
                    <div className='xs:block sm:hidden'>
                    <HambergerMenu color='white' size={28} variant='Outline' />
                </div>
            </div>
        </header>
    )
}

export default Header