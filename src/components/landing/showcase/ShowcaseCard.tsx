import React from 'react'
import styles from '@/styles/home.module.css'
import Image from 'next/image'

type ShowcaseCardProps = {
    photoUrl: string
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ photoUrl }) => {
  return <Image src={photoUrl} alt='member' width={422} height={438} />
}

export default ShowcaseCard