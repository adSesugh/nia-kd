'use client'

import React from 'react'
import styles from '@/styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HambergerMenu, Menu, MenuBoard } from 'iconsax-react'

const Header = () => {
 const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.menubarWrapper}>
        <Link href={'/'}>
         <Image alt='NIA-Kd' src={'/assets/images/nia_logo_white.svg'} width={172} height={66.08} />
        </Link>
        <div className='xs:hidden sm:block'>
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
                <Link href={'/blog'}>Blog</Link>
                {pathname.includes('blog') && <div className={styles.menuActive}></div>}
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
                <Link href={'/contact'}>Contact</Link>
                {pathname.includes('contact') && <div className={styles.menuActive}></div>}
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