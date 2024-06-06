'use client'

import React from 'react'
import styles from '@/styles/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HambergerMenu, Menu, MenuBoard } from 'iconsax-react'

const Footer = () => {
  return (
    <header className={styles.footer}>
      <div className={styles.footerWrapper}>
        <Link href={'/'}>
         <Image alt='NIA-Kd' src={'/assets/logo-kd.svg'} width={102} height={26.08} />
        </Link>
        <div className='xs:hidden sm:block'>
          <ul className={styles.menubar}>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/'}>Home</Link>
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/events'}>Events</Link>
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/about'}>About Us</Link>
              </div>
            </li>
            <li>
              <div className={styles.menuitem}>
                <Link href={'/contact'}>Contact Us</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Footer