import Image from 'next/image'
import React from 'react'
import styles from '@/styles/home.module.css'
import Link from 'next/link'
import { TeamCardProps } from '@/types/common'

const TeamCardBlack: React.FC<TeamCardProps> = ({imageUrl, name, designation, social_media }) => {
    return (
        <div className={styles.memberCard}>
            <Image src={imageUrl || '/assets/images/team.png'} alt={name} width={281} height={330} />
            <div className={'flex flex-col pt-2 justify-center items-center'}>
                <h1 className='text-white'>{name}</h1>
                <h6 className='text-[#666666] text-[14px]'>{designation}</h6>
            </div>
            <div className={'flex py-2 justify-center items-center gap-3'}>
                <Link href={social_media.linkedin} target='_blank'>
                    <Image src={'/assets/icons/linkedin-white.svg'} alt='linkedin' height={20} width={20} />
                </Link>
                <Link href={social_media.twitter} target='_blank'>
                    <Image src={'/assets/icons/twitter-white.svg'} alt='linkedin' height={20} width={20} />
                </Link>
            </div>
        </div>
    )
}

export default TeamCardBlack