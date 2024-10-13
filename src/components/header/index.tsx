'use client'

import React, { useState } from 'react'
import styles from '@/styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HambergerMenu } from 'iconsax-react'
import { Drawer, Sidebar } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/store'
import { Role } from '@/lib/common'

const Header = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.userData.user)

  const handleDrawer = () => setIsOpen(cur => !cur);

  return (
    <header className={styles.header}>
      <div className={styles.menubarWrapper}>
        <Link href={'/'}>
         <Image alt='NIA-Kd' src={'/assets/logo.png'} width={132} height={46.08} />
        </Link>
        <div className='xs:hidden sm:flex'>
          <ul className={styles.menubar}>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/'}>Home</Link>
                {pathname === '/' && <div className={styles.menuActive}></div>}
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/events'}>Events</Link>
                {pathname.includes('events') && <div className={styles.menuActive}></div>}
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/gallery'}>Gallery</Link>
                {pathname.includes('gallery') && <div className={styles.menuActive}></div>}
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/about'}>About Us</Link>
                {pathname.includes('about') && <div className={styles.menuActive}></div>}
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/blog'}>Blog</Link>
                {pathname.includes('blog') && <div className={styles.menuActive}></div>}
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/contact'}>Contact</Link>
                {pathname.includes('contact') && <div className={styles.menuActive}></div>}
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.loginRegister}>
          {user?.id ? (
            <Link href={user.role === Role.ADMINISTRATOR ? '/dashboard' : '/member/dashboard'} className={styles.joinButton}>Go to Dashboard</Link>
          ): (
            <>
              <Link href={'/auth/login'} className={styles.loginButton}>Login</Link>
              <Link href={'/auth/register'} className={styles.joinButton}>Join NIAKD</Link>
            </>
          )}
        </div>
        <div className='xs:flex sm:hidden'>
            <HambergerMenu color='white' size={28} variant='Outline' onClick={handleDrawer} />
        </div>
      </div>
      <Drawer open={isOpen} onClose={handleDrawer} position="right" className='bg-[#1E1A1C]'>
        <div className='flex justify-between mb-6 h-[8%]'>
            <Image alt='NIA-Kd' src={'/assets/newLogo.svg'} width={100} height={30.08} />
            <Drawer.Header title="" titleIcon={() => <></>} />
        </div>
        <hr />
        <Drawer.Items>
            <Sidebar
                aria-label="Sidebar with multi-level dropdown example"
                className="[&>div]:bg-transparent [&>div]:p-0 h-[92%]"
            >
              <div className="flex h-full flex-col justify-between py-2 pt-4">
                <div>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="/">
                                <h1 className={`${pathname === '/' ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Home</h1>
                                {pathname === '/' && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                            <Sidebar.Item href="/events">
                                <h1 className={`${pathname.includes('events') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Events</h1>
                                {pathname.includes('events') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                            <Sidebar.Item href="/gallery">
                                <h1 className={`${pathname.includes('gallery') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Gallery</h1>
                                {pathname.includes('gallery') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                            <Sidebar.Item href="/about">
                                <h1 className={`${pathname.includes('about') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>About Us</h1>
                                {pathname.includes('about') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                            <Sidebar.Item href="/blog">
                                <h1 className={`${pathname.includes('blog') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Blog</h1>
                                {pathname.includes('blog') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                            <Sidebar.Item href="/contact">
                                <h1 className={`${pathname.includes('contact') ? 'text-gray-50' : 'text-[#BFBFBF]'}`}>Contact</h1>
                                {pathname.includes('contact') && <div className={'w-full h-1.5 bg-[#D99A3F] rounded-t-xl'}></div>}
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </div>
                <div className='pt-12 w-full px-4'>
                  <div className={'flex space-x-4'}>
                    {user?.id ? (
                      <Link href={user.role === Role.ADMINISTRATOR ? '/dashboard' : '/member/dashboard'} className={styles.joinButton}>Go to Dashboard</Link>
                    ): (
                      <>
                        <Link href={'/auth/login'} className={styles.loginButton}>Login</Link>
                        <Link href={'/auth/register'} className={styles.joinButton}>Join NIAKD</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Sidebar>
        </Drawer.Items>
      </Drawer>
    </header>
  )
}

export default Header