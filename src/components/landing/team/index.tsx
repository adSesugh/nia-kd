import React from 'react'
import styles from '@/styles/home.module.css'
import TeamCard from './TeamCard'

const members = [
    {
        imageUrl: '/assets/team/9.png',
        name: 'Arc. Stephen. J. Filiya FNIA',
        designation: 'Chairman, NIA Kaduna',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '/assets/team/10.jpeg',
        name: 'Arc. Binta Danmaliki FNIA',
        designation: 'Vice Chairman',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '/assets/team/2.png',
        name: 'Arc. Danjuma S. Ageni MNIA',
        designation: 'General Secretary',
        social_media: {
            twitter: 'https://x.com/DanjAgeni',
            linkedin: 'https://www.linkedin.com/in/danjuma-ageni-mpm-mnia-173b7279'
        }
    },
    {
        imageUrl: '/assets/team/4.png',
        name: 'Arc. Gbenga Popoola MNIA',
        designation: 'Treasurer',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    }
]

const NIATeam = () => {
    return (
        <div className={`${styles.teamSection}`}>
            <div className={styles.teamHeader}>
                <h1>Meet Our Team</h1>
            </div>
            <div className={styles.teamMember}>
                {members.map((member, index) => (
                    <TeamCard {...member} key={index} />
                ))}
            </div>
        </div>
    )
}

export default NIATeam