import { LayoutProps } from '@/types/common'
import React from 'react'
import styles from '@/styles/auth.module.css'
import Image from 'next/image'
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Login | NIA-Kd",
    description: "NIA-Kd Home",
};

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.authLayout}>
           <div className={styles.authWrapper}>
                <div className={styles.logoPanel}>
                    <div>
                        <Link href={'/'}>
                            <Image 
                                src={'/assets/logo.png'} 
                                alt='NIA-Kd' 
                                width={250} 
                                height={150} 
                                sizes='100vw'
                                // style={{
                                //     width: '100%',
                                //     height: 'auto'
                                // }} 
                            />
                        </Link>
                    </div>
                </div>
                <div className={styles.authPanel}>
                    {children}
                </div>
           </div>
        </div>
    )
}

export default AuthLayout