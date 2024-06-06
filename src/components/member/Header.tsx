/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import styles from '@/styles/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowDown2, ArrowUp2, Calendar2, HambergerMenu, Home, Notification, Ticket, Ticket2 } from 'iconsax-react'
import NairaIcon from '../custom-icons/NairaIcon'
import CertificateIcon from '../custom-icons/CertificateIcon'
import { Drawer, Sidebar } from 'flowbite-react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '@/features/hooks'
import { RootState } from '@/features/store'
import { logOut } from '@/features/slices/authSlice'

const Header = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAppSelector((state: RootState) => state.auth.userData)
    const dispatch = useAppDispatch()

    const handleDrawer = () => setIsOpen(cur => !cur);

    const getFullname = () => {
        return `${user?.member?.firstName} ${user?.member?.lastName}`
    }

    const SHomeIcon = () => <Home variant='Outline' size={20} color={`${pathname === '/member/dashboard' ? '#F2F2F2' : '#BFBFBF'}`} />
    const SCalenderIcon = () => <Calendar2 variant='Outline' size={20} color={`${pathname === '/member/events' ? '#F2F2F2' : '#BFBFBF'}`} />
    const STicketIcon = () => <Ticket variant='Outline' size={20} color={`${pathname === '/member/tickets' ? '#F2F2F2' : '#BFBFBF'}`} />
    const SDuesIcon = () => {
        return (
            <NairaIcon 
                stroke={`${pathname === '/member/dues' ? '#F2F2F2' : '#BFBFBF'}`} 
                height={20}
                width={20}
                fill={'white'}
            />
        )
    }

    const SCertificateIcon = () => {
        return (
            <CertificateIcon 
                stroke={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} 
                height={20}
                width={20}
            />
        )
    }

    return (
        <header className={styles.header}>
            <div className={styles.menubarWrapper}>
                <Link href={'/'}>
                    <Image alt='NIA-Kd' src={'/assets/newLogo.svg'} width={85} height={20.08} />
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
                                    <Calendar2 variant='Outline' size={20} color={`${pathname === '/member/events' ? '#F2F2F2' : '#BFBFBF'}`} />
                                    <span className={`${pathname === '/member/events' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Events</span>
                                </Link>
                                {pathname.includes('/member/events') && <div className={styles.menuActive}></div>}
                            </div>
                        </li>
                        <li>
                            <div className={styles.menuitem}>
                                <Link href={'/member/dues'} className='flex items-center gap-2'>
                                    <NairaIcon 
                                        stroke={`${pathname === '/member/dues' ? '#F2F2F2' : '#BFBFBF'}`} 
                                        height={20}
                                        width={20}
                                        fill={'white'}
                                    />
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
                                    <CertificateIcon 
                                        stroke={`${pathname === '/member/certificates' ? '#F2F2F2' : '#BFBFBF'}`} 
                                        height={20}
                                        width={20}
                                    />
                                    <span className={`${pathname === '/member/certificates' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Certificates</span>
                                </Link>
                                {pathname.includes('member/certificates') && <div className={styles.menuActive}></div>}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.userProfile}>
                    <div className='relative'>
                        <Notification color='#FFFFFF' size={20} variant='Outline' />
                        <div className='absolute -top-[2px] right-[2px] h-2.5 w-2.5 rounded-full bg-[#F52A2A] border-2 border-[#1E1A1C]' />
                    </div>
                    <div className='flex items-center space-x-3 xs:hidden sm:flex'>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: false,
                                        src: `${user?.member?.photoURL !== undefined ? user.member.photoURL : '/assets/profile.svg'}`,
                                    }}
                                    className="transition-transform text-white"
                                    name={
                                    <div className='flex space-x-2 leading-3 -mb-1'>
                                        <h1 className='text-[12px] text-white leading-3'>{getFullname()}</h1>
                                        <ArrowDown2 variant='Outline' color='#ffffff' size={16} />
                                    </div>
                                    }
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">Signed in as</p>
                                <p className="font-bold">@{user?.role.toLowerCase()}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" as={Link} href='/member/profile'>
                                My Profile
                            </DropdownItem>
                            <DropdownItem key="logout" onClick={() => dispatch(logOut())}>
                                Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='xs:flex sm:hidden'>
                        <HambergerMenu color='white' size={28} variant='Outline' onClick={handleDrawer} />
                    </div>
                </div>
            </div>
            <Drawer open={isOpen} onClose={handleDrawer} position="right" className='bg-[#1E1A1C]'>
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        <div className='flex justify-between mb-6'>
                            <Image alt='NIA-Kd' src={'/assets/newLogo.svg'} width={100} height={30.08} />
                            <Drawer.Header title="" titleIcon={() => <></>} />
                        </div>
                        <hr />
                        <Drawer.Items>
                            <Sidebar
                                aria-label="Sidebar with multi-level dropdown example"
                                className="[&>div]:bg-transparent [&>div]:p-0"
                            >
                                <div className="flex h-full flex-col justify-between py-2 pt-4">
                                    <div>
                                        <Sidebar.Items>
                                            <Sidebar.ItemGroup>
                                                <Sidebar.Item href="/member/dashboard" icon={SHomeIcon}>
                                                    <h1 className={`${pathname.includes('member/dashboard') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Home</h1>
                                                    {pathname.includes('member/dashboard') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                                                </Sidebar.Item>
                                                <Sidebar.Item href="/member/events" icon={SCalenderIcon}>
                                                    <h1 className={`${pathname.includes('member/events') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Events</h1>
                                                    {pathname.includes('member/events') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                                                </Sidebar.Item>
                                                <Sidebar.Item href="/member/dues" icon={SDuesIcon}>
                                                    <h1 className={`${pathname.includes('member/dues') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Annual Dues</h1>
                                                    {pathname.includes('member/dues') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                                                </Sidebar.Item>
                                                <Sidebar.Item href="/member/tickets" icon={STicketIcon}>
                                                    <h1 className={`${pathname.includes('member/tickets') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Tickets</h1>
                                                    {pathname.includes('member/tickets') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                                                </Sidebar.Item>
                                                <Sidebar.Item href="/member/certificates" icon={SCertificateIcon}>
                                                    <h1 className={`${pathname.includes('member/certificates') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Certificates</h1>
                                                    {pathname.includes('member/certificates') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                                                </Sidebar.Item>
                                            </Sidebar.ItemGroup>
                                        </Sidebar.Items>
                                    </div>
                                </div>
                            </Sidebar>
                        </Drawer.Items>
                    </div>
                    <div className='pb-6 px-4'>
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                    isBordered: true,
                                    src: `${user?.member?.photoURL !== undefined ? user.member .photoURL : '/assets/profile.svg'}`,
                                    }}
                                    className="transition-transform text-white"
                                    description={user?.role}
                                    name={
                                    <div className='flex space-x-2 leading-3 -mb-1'>
                                        <h1 className='text-[12px] text-white leading-3'>{getFullname()}</h1>
                                        <ArrowUp2 variant='Outline' color='#ffffff' size={16} />
                                    </div>
                                    }
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">Signed in as</p>
                                <p className="font-bold">@{user?.role.toLowerCase()}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                            <DropdownItem key="logout" onClick={() => dispatch(logOut())}>
                                Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                
            </Drawer>
        </header>
    )
}

export default Header