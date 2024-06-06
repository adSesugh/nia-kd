import Image from 'next/image'
import React from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'
import { Facebook, Twitch } from 'iconsax-react'
import { TeamCardProps } from '@/types/common'

const TeamCard: React.FC<TeamCardProps> = ({imageUrl, name, designation, social_media }) => {
    return (
        <div className={styles.memberCard}>
            <Image 
                src={imageUrl || '/assets/images/team.png'} 
                alt={name} 
                width={281} 
                height={330}
                sizes='100vw'
                style={{
                    width: '100%',
                    height: 'auto'
                }} 
            />
            <div className={styles.teamTitle}>
                <h1>{name}</h1>
                <h6 className='text-[#666666] text-[14px]'>{designation}</h6>
            </div>
            <div className={styles.memberSM}>
                <Link href={social_media.linkedin} target='_blank'>
                    <Image src={'/assets/icons/linkedin.svg'} alt='linkedin' height={20} width={20} />
                </Link>
                <Link href={social_media.twitter} target='_blank'>
                    <Image src={'/assets/icons/new-twitter.svg'} alt='linkedin' height={20} width={20} />
                </Link>
            </div>
        </div>
    )
}

export default TeamCard