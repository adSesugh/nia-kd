import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

type ShowcaseCardProps = {
    photoUrl: string
    className?: string
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ photoUrl, className }) => {
  return <Image src={photoUrl} alt='member' width={422} height={438} className={className} />
}

export default ShowcaseCard